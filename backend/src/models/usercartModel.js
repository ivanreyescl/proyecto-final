
import pool from "../../db/config.js";

export const getUserCartModel = async (userId) => {
    const sqlQuery = {
        text: `
        SELECT 
            uc.id AS user_cart_id,
            uc.user_id,
            uc.total_price,
            json_agg(
            json_build_object(
                'cart_item_id', ci.id,
                'product_id', ci.product_id,
                'quantity', ci.quantity,
                'product', json_build_object(
                    'name', p.name,
                    'detail', p.detail,
                    'code', p.code,
                    'price', p.price,
                    'stock', p.stock,
                    'image', p.image
                )
            )
            ) AS cart_items
        FROM usercarts uc
        LEFT JOIN cartitems ci ON ci.user_cart_id = uc.id
        LEFT JOIN products p ON ci.product_id = p.id
        WHERE uc.user_id = $1
        GROUP BY uc.id
        `,
        values: [userId],
    };

    const response = await pool.query(sqlQuery);
    return response.rows[0] || null;
};

export const addCartItemModel = async (userId, productId, quantity) => {
    let cart = await pool.query('SELECT id FROM usercarts WHERE user_id = $1', [userId]);
    let cartId;
    if (cart.rows.length === 0) {
        const newCart = await pool.query(
            'INSERT INTO usercarts (user_id, total_price) VALUES ($1, 0) RETURNING id',
            [userId]
        );
        cartId = newCart.rows[0].id;
    } else {
        cartId = cart.rows[0].id;
    }

    const productRes = await pool.query(
        'SELECT price FROM products WHERE id = $1',
        [productId]
    );
    const productPrice = productRes.rows[0]?.price || 0;

    const totalToAdd = productPrice * quantity;

    await pool.query(
        'UPDATE usercarts SET total_price = total_price + $1 WHERE id = $2',
        [totalToAdd, cartId]
    );

    const existingItem = await pool.query(
        'SELECT id, quantity FROM cartitems WHERE user_cart_id = $1 AND product_id = $2',
        [cartId, productId]
    );
    console.log(existingItem.rows.length > 0)
    if (existingItem.rows.length > 0) {
        const updated = await pool.query(
            'UPDATE cartitems SET quantity = quantity + 1 WHERE id = $1 RETURNING *',
            [existingItem.rows[0].id]
        );
        return updated.rows[0];
    } else {
        const response = await pool.query(
            'INSERT INTO cartitems (user_cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
            [cartId, productId, quantity]
        );
        return response.rows[0];
    }
};

export const updateCartItemModel = async (cartItemId, quantity, productId = null) => {
    const itemRes = await pool.query(
        'SELECT user_cart_id, quantity, product_id FROM cartitems WHERE id = $1',
        [cartItemId]
    );
    if (itemRes.rows.length === 0) return null;

    const { user_cart_id, quantity: oldQuantity, product_id: prodId } = itemRes.rows[0];

    const productRes = await pool.query(
        'SELECT price FROM products WHERE id = $1',
        [productId || prodId]
    );
    const price = productRes.rows[0]?.price || 0;

    const diff = quantity - oldQuantity;
    await pool.query(
        'UPDATE usercarts SET total_price = total_price + $1 WHERE id = $2',
        [diff * price, user_cart_id]
    );

    const fields = ['quantity = $1'];
    const values = [quantity];
    let idx = 2;

    if (productId !== null) {
        fields.push(`product_id = $${idx}`);
        values.push(productId);
        idx++;
    }

    values.push(cartItemId);

    const response = await pool.query(
        `UPDATE cartitems SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
        values
    );

    return response.rows[0];
};

export const deleteCartItemModel = async (cartItemId) => {
    const itemRes = await pool.query(
        'SELECT user_cart_id, quantity, product_id FROM cartitems WHERE id = $1',
        [cartItemId]
    );
    if (itemRes.rows.length === 0) return null;

    const { user_cart_id, quantity, product_id } = itemRes.rows[0];

    const productRes = await pool.query(
        'SELECT price FROM products WHERE id = $1',
        [product_id]
    );
    const price = productRes.rows[0]?.price || 0;

    await pool.query(
        'UPDATE usercarts SET total_price = total_price - $1 WHERE id = $2',
        [quantity * price, user_cart_id]
    );

    const response = await pool.query(
        'DELETE FROM cartitems WHERE id = $1 RETURNING *',
        [cartItemId]
    );

    return response.rows[0];
};
