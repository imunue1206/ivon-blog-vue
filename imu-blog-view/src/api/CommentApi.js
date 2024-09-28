import request  from '@/api/BaseRequest'

const pageSize = 10;

export default {

    // 获取指定帖子的评论
    async getCommentsByPostId(postId, page) {
        const response = await request.get(`/comments`, { params: { postId, page, pageSize} });
        return response.data;
    },

    // 获取指定父评论的回复
    async getRepliesByParentId(parentId, page) {
        const response = await request.get(`/commnet-replies`, { params: {parentId, page, pageSize} })
    },

    // 添加新的评论
    async addComment(comment) {
        const response = await request.post('/comment/', comment );
        return response.data;
    },

    // 删除评论
    async deleteComment(commentId) {
        await request.delete(`/comment/${commentId}`);
    },

    // 添加评论回复
    async addReply(reply) {
        const response = await request.post('/comment-reply', reply);
        return response.data;
    },
};