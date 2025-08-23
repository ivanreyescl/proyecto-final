
import pool from "../../db/config.js";

export const getUserFavoriteModel = async (userId) => {
    const sqlQuery = {
        text: `
        SELECT 
            uf.id AS user_favorite_id,
            uf.user_id,
            uf.total_liked,
            json_agg(
                json_build_object(
                    'favorite_item_id', fi.id,
                    'product_id', fi.product_id,
                    'product', json_build_object(
                        'name', p.name,
                        'detail', p.detail,
                        'code', p.code,
                        'price', p.price,
                        'stock', p.stock,
                        'image', p.image
                    )
                )
            ) AS favorite_items
        FROM userfavorites uf
        LEFT JOIN favoriteitems fi ON fi.user_favorite_id = uf.id
        LEFT JOIN products p ON fi.product_id = p.id
        WHERE uf.user_id = $1
        GROUP BY uf.id
        `,
        values: [userId],
    };

    const response = await pool.query(sqlQuery);
    return response.rows[0] || null;
};


export const addFavoriteItemModel = async (userId, productId, quantity = 1) => {
    // Obtener o crear UserFavorites
    let favorite = await pool.query(
        'SELECT id FROM userfavorites WHERE user_id = $1', 
        [userId]
    );

    let favoriteId;
    if (favorite.rows.length === 0) {
        const newFavorite = await pool.query(
            'INSERT INTO userfavorites (user_id, total_liked) VALUES ($1, 0) RETURNING id',
            [userId]
        );
        favoriteId = newFavorite.rows[0].id;
    } else {
        favoriteId = favorite.rows[0].id;
    }

    await pool.query(
        'UPDATE userfavorites SET total_liked = total_liked + $1 WHERE id = $2',
        [quantity, favoriteId]
    );

    const existingItem = await pool.query(
        'SELECT id FROM favoriteitems WHERE user_favorite_id = $1 AND product_id = $2',
        [favoriteId, productId]
    );

    if (existingItem.rows.length > 0) {
        return existingItem.rows[0];
    } else {
        const response = await pool.query(
            'INSERT INTO favoriteitems (user_favorite_id, product_id) VALUES ($1, $2) RETURNING *',
            [favoriteId, productId]
        );
        return response.rows[0];
    }

};

export const updateFavoriteItemModel = async (favoriteItemId, quantity, productId = null) => {
    const itemRes = await pool.query(
        'SELECT user_favorite_id, quantity, product_id FROM favoriteitems WHERE id = $1',
        [favoriteItemId]
    );
    if (itemRes.rows.length === 0) return null;

    const { user_favorite_id, quantity: oldQuantity } = itemRes.rows[0];
    const diff = quantity - oldQuantity;

    // Actualizar total_liked
    await pool.query(
        'UPDATE userfavorites SET total_liked = total_liked + $1 WHERE id = $2',
        [diff, user_favorite_id]
    );

    const fields = ['quantity = $1'];
    const values = [quantity];
    let idx = 2;

    if (productId !== null) {
        fields.push(`product_id = $${idx}`);
        values.push(productId);
        idx++;
    }

    values.push(favoriteItemId);

    const response = await pool.query(
        `UPDATE favoriteitems SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
        values
    );

    return response.rows[0];
};

export const deleteFavoriteItemModel = async (favoriteItemId) => {
    const itemRes = await pool.query(
        'SELECT user_favorite_id, quantity FROM favoriteitems WHERE id = $1',
        [favoriteItemId]
    );
    if (itemRes.rows.length === 0) return null;

    const { user_favorite_id, quantity } = itemRes.rows[0];

    // Restar del total_liked
    await pool.query(
        'UPDATE userfavorites SET total_liked = total_liked - $1 WHERE id = $2',
        [quantity, user_favorite_id]
    );

    const response = await pool.query(
        'DELETE FROM favoriteitems WHERE id = $1 RETURNING *',
        [favoriteItemId]
    );

    return response.rows[0];
};
