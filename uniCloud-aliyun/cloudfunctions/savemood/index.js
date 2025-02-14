'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
    const { mood } = event;

    try {
        // 插入数据到数据库
        await db.collection('moods').add({
            mood,
            created_at: new Date()
        });
        return { success: true, message: '保存成功' };
    } catch (err) {
        console.error(err);
        return { success: false, message: '保存失败' };
    }
};
