package com.geovis.ai.model;

import java.io.Serializable;
import java.util.Date;

public class Demands implements Serializable {
    /**
     * 
     */
    private Integer id;

    /**
     * 标题
     */
    private String title;

    /**
     * 发布用户id
     */
    private Long userId;

    /**
     * 分类
     */
    private Integer classid;

    /**
     * 类型
     */
    private String type;

    /**
     * 评分
     */
    private Integer starRating;

    /**
     * 投标周期
     */
    private String biddingCycle;

    /**
     * 投标截止时间
     */
    private Date biddingTime;

    /**
     * 交付周期
     */
    private String deliverCycle;

    /**
     * 成果交付时间
     */
    private Date deliverTime;

    /**
     * 投标数
     */
    private Integer biddingCount;

    /**
     * 评论数
     */
    private Integer commentCount;

    /**
     * 状态 0待审核状态，1 审核完成，2审核失败
     */
    private Byte status;

    /**
     * 悬赏积分
     */
    private Integer price;

    /**
     * 进度状态 0 投递查看中 1开发中 2交付完成
     */
    private Byte schedule;

    /**
     * 插件包 默认0  delete :1
     */
    private Byte isDel;

    /**
     * 
     */
    private Date createdAt;

    /**
     * 
     */
    private Date updatedAt;

    /**
     * 封面图
     */
    private String coverUrl;

    /**
     * 需求描述
     */
    private String introduction;

    /**
     * 成果要求详情
     */
    private String content;

    /**
     * 投标文件要求
     */
    private String biddingIntro;

    /**
     * demands
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
     * 发布用户id
     * @return user_id 发布用户id
     */
    public Long getUserId() {
        return userId;
    }

    /**
     * 发布用户id
     * @param userId 发布用户id
     */
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    /**
     * 分类
     * @return classid 分类
     */
    public Integer getClassid() {
        return classid;
    }

    /**
     * 分类
     * @param classid 分类
     */
    public void setClassid(Integer classid) {
        this.classid = classid;
    }

    /**
     * 类型
     * @return type 类型
     */
    public String getType() {
        return type;
    }

    /**
     * 类型
     * @param type 类型
     */
    public void setType(String type) {
        this.type = type == null ? null : type.trim();
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
     * 投标周期
     * @return bidding_cycle 投标周期
     */
    public String getBiddingCycle() {
        return biddingCycle;
    }

    /**
     * 投标周期
     * @param biddingCycle 投标周期
     */
    public void setBiddingCycle(String biddingCycle) {
        this.biddingCycle = biddingCycle == null ? null : biddingCycle.trim();
    }

    /**
     * 投标截止时间
     * @return bidding_time 投标截止时间
     */
    public Date getBiddingTime() {
        return biddingTime;
    }

    /**
     * 投标截止时间
     * @param biddingTime 投标截止时间
     */
    public void setBiddingTime(Date biddingTime) {
        this.biddingTime = biddingTime;
    }

    /**
     * 交付周期
     * @return deliver_cycle 交付周期
     */
    public String getDeliverCycle() {
        return deliverCycle;
    }

    /**
     * 交付周期
     * @param deliverCycle 交付周期
     */
    public void setDeliverCycle(String deliverCycle) {
        this.deliverCycle = deliverCycle == null ? null : deliverCycle.trim();
    }

    /**
     * 成果交付时间
     * @return deliver_time 成果交付时间
     */
    public Date getDeliverTime() {
        return deliverTime;
    }

    /**
     * 成果交付时间
     * @param deliverTime 成果交付时间
     */
    public void setDeliverTime(Date deliverTime) {
        this.deliverTime = deliverTime;
    }

    /**
     * 投标数
     * @return bidding_count 投标数
     */
    public Integer getBiddingCount() {
        return biddingCount;
    }

    /**
     * 投标数
     * @param biddingCount 投标数
     */
    public void setBiddingCount(Integer biddingCount) {
        this.biddingCount = biddingCount;
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
     * 状态 0待审核状态，1 审核完成，2审核失败
     * @return status 状态 0待审核状态，1 审核完成，2审核失败
     */
    public Byte getStatus() {
        return status;
    }

    /**
     * 状态 0待审核状态，1 审核完成，2审核失败
     * @param status 状态 0待审核状态，1 审核完成，2审核失败
     */
    public void setStatus(Byte status) {
        this.status = status;
    }

    /**
     * 悬赏积分
     * @return price 悬赏积分
     */
    public Integer getPrice() {
        return price;
    }

    /**
     * 悬赏积分
     * @param price 悬赏积分
     */
    public void setPrice(Integer price) {
        this.price = price;
    }

    /**
     * 进度状态 0 投递查看中 1开发中 2交付完成
     * @return schedule 进度状态 0 投递查看中 1开发中 2交付完成
     */
    public Byte getSchedule() {
        return schedule;
    }

    /**
     * 进度状态 0 投递查看中 1开发中 2交付完成
     * @param schedule 进度状态 0 投递查看中 1开发中 2交付完成
     */
    public void setSchedule(Byte schedule) {
        this.schedule = schedule;
    }

    /**
     * 插件包 默认0  delete :1
     * @return is_del 插件包 默认0  delete :1
     */
    public Byte getIsDel() {
        return isDel;
    }

    /**
     * 插件包 默认0  delete :1
     * @param isDel 插件包 默认0  delete :1
     */
    public void setIsDel(Byte isDel) {
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
     * 封面图
     * @return cover_url 封面图
     */
    public String getCoverUrl() {
        return coverUrl;
    }

    /**
     * 封面图
     * @param coverUrl 封面图
     */
    public void setCoverUrl(String coverUrl) {
        this.coverUrl = coverUrl == null ? null : coverUrl.trim();
    }

    /**
     * 需求描述
     * @return introduction 需求描述
     */
    public String getIntroduction() {
        return introduction;
    }

    /**
     * 需求描述
     * @param introduction 需求描述
     */
    public void setIntroduction(String introduction) {
        this.introduction = introduction == null ? null : introduction.trim();
    }

    /**
     * 成果要求详情
     * @return content 成果要求详情
     */
    public String getContent() {
        return content;
    }

    /**
     * 成果要求详情
     * @param content 成果要求详情
     */
    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }

    /**
     * 投标文件要求
     * @return bidding_intro 投标文件要求
     */
    public String getBiddingIntro() {
        return biddingIntro;
    }

    /**
     * 投标文件要求
     * @param biddingIntro 投标文件要求
     */
    public void setBiddingIntro(String biddingIntro) {
        this.biddingIntro = biddingIntro == null ? null : biddingIntro.trim();
    }
}