import commentApi from '@/api/CommentApi';
import { useUserStore } from '@/stores/UserStore';
import { useCommentStore } from '@/stores/CommentStore'

class Comment {
    constructor(data) {
        this.commentId = data.commentId;
        this.commentUserId = data.commentUserId;
        this.commentUserName = data.commentUserName;
        this.postId = data.postId;
        this.content = data.content;
        this.commentTime = data.commentTime;
        this.likes = data.likes || 0;
        this.dislikes = data.dislikes || 0;
        this.userReaction = data.userReaction || 0;
        this.replies = data.replies || [];
    }

    // 获取指定帖子的评论
    static async getComments(postId, page) {
        return await commentApi.getCommentsByPostId(postId, page);
    }

    // 获取父评论的回复
    async getReplies(page) {
        return await commentApi.getRepliesByParentId(this.commentId, page);
    }

    // 添加评论
    static async addComment(postId, content) {
        const userStore = useUserStore();
        const param = {
            postId,
            content,
            userId: userStore.userId,
            userName: userStore.userName
        };
        return await commentApi.addComment(param);
    }

    // 添加回复
    async addReply(content) {
        const userStore = useUserStore();
        const param = {
            postId: this.postId,
            parentId: this.commentId,
            content,
            userId: userStore.userId,
            userName: userStore.userName
        };
        return await commentApi.addReply(param);
    }

    // 删除评论
    static async deleteComment(commentId) {
        return await commentApi.deleteComment(commentId);
    }
}

class Reply {
    constructor(data) {
        this.replyCommentId = data.replyCommentId;
        this.parentId = data.parentId;
        this.commentId = data.commentId;
        this.replyUserId = data.replyUserId;
        this.replyUserName = data.replyUserName;
        this.postId = data.postId;
        this.content = data.content;
        this.replyTime = data.replyTime;
        this.likes = data.likes || 0;
        this.dislikes = data.dislikes || 0;
        this.userReaction = data.userReaction || 0;
    }

    // 添加回复
    static async addReply(postId, commentId, content) {
        const userStore = useUserStore();
        const param = {
            postId,
            parentId: commentId,
            content,
            userId: userStore.userId,
            userName: userStore.userName
        };
        return await commentApi.addReply(param);
    }

    // 删除回复
    static async deleteReply(commentId) {
        return await commentApi.deleteComment(commentId);
    }
}

export { Comment, Reply };