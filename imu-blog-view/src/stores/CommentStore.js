import { defineStore } from 'pinia';
import { Comment, Reply } from '@/services/CommentService';
import { useUserStore } from '@/stores/UserStore';

export const useCommentStore = defineStore('commentStore', {
    state: () => ({
        comments: [],  // 存储评论列表
    }),
    actions: {

        // 分页获取评论，并追加到现有评论列表中
        async fetchComments(postId, page) {
            const newComments = await Comment.getComments(postId, page);
            this.comments.push(...newComments);
        },

        // 分页获取回复，并追加到相应的评论的回复列表中
        async fetchReplies(parentId, page) {
            const parentComment = this.comments.find(c => c.commentId === parentId);
            if (parentComment) {
                const newReplies = await Comment.getReplies(parentId, page);
                parentComment.replies.push(...newReplies);
            }
        },

        // 添加新评论
        async addComment(postId, content) {
            const userStore = useUserStore();
            const response = await Comment.addComment({ postId, content });

            if (response.success) {
                // 根据接口返回的 commentId 和参数，生成一个新的 Comment 对象
                const newComment = new Comment({
                    commentId: response.commentId, // 假设接口返回的 commentId
                    commentUserId: userStore.userId,
                    commentUserName: userStore.userName,
                    postId,
                    content,
                    commentTime: '刚刚', // 设置为“刚刚”
                    likes: 0,
                    dislikes: 0,
                    userReaction: 0,
                    replies: []
                });
                this.comments.unshift(newComment); // 将新评论插入到评论列表开头
            }
        },

        // 添加新回复
        async addReply(postId, parentId, content) {
            const userStore = useUserStore();
            const parentComment = this.comments.find(c => c.commentId === parentId);
            if (parentComment) {
                const response = await Reply.addReply({postId, parentId, content });

                if (response.success) {
                    // 根据接口返回的 replyCommentId 和参数，生成一个新的 Reply 对象
                    const newReply = new Reply({
                        replyCommentId: response.replyCommentId, // 假设接口返回的 replyCommentId
                        parentId,
                        replyUserId: userStore.userId,
                        replyUserName: userStore.userName,
                        postId,
                        content,
                        replyTime: '刚刚', // 设置为“刚刚”
                        likes: 0,
                        dislikes: 0,
                        userReaction: 0
                    });
                    parentComment.replies.unshift(newReply); // 将新回复插入到回复列表开头
                }
            }
        },

        // 删除评论
        async deleteComment(commentId) {
            await Comment.deleteComment(commentId);
            this.comments = this.comments.filter(c => c.commentId !== commentId);
        },

        // 删除回复
        async deleteReply(commentId) {
            for (const comment of this.comments) {
                const replyIndex = comment.replies.findIndex(r => r.replyCommentId === commentId);
                if (replyIndex !== -1) {
                    await Reply.deleteReply(commentId);
                    comment.replies.filter(t => t.commentId !== commentId && t.replyCommentId !== commentId)
                    break;
                }
            }
        }
    },
});