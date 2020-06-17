package com.geovis.ai.model;

import java.io.Serializable;
import java.util.Date;

public class Articles implements Serializable {
    /**
     * 
     */
    private Integer id;

    /**
     * 标题
     */
    private String title;

    /**
     * 发布用户ID
     */
    private Long userId;

    /**
     * 类型id
     */
    private Integer classificationId;

    /**
     * 评论数
     */
    private Integer commentCount;

    /**
     * 评分
     */
    private Integer starRating;

    /**
     * 是否删除
     */
    private Integer isDel;

    /**
     * 
     */
    private Date createdAt;

    /**
     * 
     */
    private Date updatedAt;

    /**
     * 详情
     */
    private String content;

    /**
     * articles
     */
    private static final long serialVersionUID = 1L;

    /**
     * 
     * @return id 
     */
    public Integer getId() {
        return id;
    }

    /**
     * 
     * @param id 
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 标题
     * @return title 标题
     */
    public String getTitle() {
        return title;
    }

    /**
     * 标题
     * @param title 标题
     */
    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    /**
     * 发布用户ID
     * @return user_id 发布用户ID
     */
    public Long getUserId() {
        return userId;
    }

    /**
     * 发布用户ID
     * @param userId 发布用户ID
     */
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    /**
     * 类型id
     * @return classification_id 类型id
     */
    public Integer getClassificationId() {
        return classificationId;
    }

    /**
     * 类型id
     * @param classificationId 类型id
     */
    public void setClassificationId(Integer classificationId) {
        this.classificationId = classificationId;
    }

    /**
     * 评论数
     * @return comment_count 评论数
     */
    public Integer getCommentCount() {
        return commentCount;
    }

    /**
     * 评论数
     * @param commentCount 评论数
     */
    public void setCommentCount(Integer commentCount) {
        this.commentCount = commentCount;
    }

    /**
     * 评分
     * @return star_rating 评分
     */
    public Integer getStarRating() {
        return starRating;
    }

    /**
     * 评分
     * @param starRating 评分
     */
    public void setStarRating(Integer starRating) {
        this.starRating = starRating;
    }

    /**
     * 是否删除
     * @return is_del 是否删除
     */
    public Integer getIsDel() {
        return isDel;
    }

    /**
     * 是否删除
     * @param isDel 是否删除
     */
    public void setIsDel(Integer isDel) {
        this.isDel = isDel;
    }

    /**
     * 
     * @return created_at 
     */
    public Date getCreatedAt() {
        return createdAt;
    }

    /**
     * 
     * @param createdAt 
     */
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    /**
     * 
     * @return updated_at 
     */
    public Date getUpdatedAt() {
        return updatedAt;
    }

    /**
     * 
     * @param updatedAt 
     */
    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    /**
     * 详情
     * @return content 详情
     */
    public String getContent() {
        return content;
    }

    /**
     * 详情
     * @param content 详情
     */
    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }
}