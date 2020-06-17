package com.geovis.ai.model;

import java.io.Serializable;
import java.util.Date;

public class Applications implements Serializable {
    /**
     * 
     */
    private Integer id;

    /**
     * 标题
     */
    private String title;

    /**
     * Status 状态 默认0 待审核  1审核通过 2 审核失败 
     */
    private Byte status;

    /**
     * 版本号
     */
    private String version;

    /**
     * 发布用户id
     */
    private Long userId;

    /**
     * 评论数
     */
    private Integer commentCount;

    /**
     * 评分
     */
    private Integer starRating;

    /**
     * 下载次数
     */
    private Integer downloadCount;

    /**
     * 购买次数
     */
    private Integer buyCount;

    /**
     * 服务包上传状态 默认0未 1 2 失败
     */
    private Byte serviceboxStatus;

    /**
     * 上架 默认1 下架2 上架1
     */
    private Byte isShelf;

    /**
     * 应用包 默认0  1  2
     */
    private Byte appboxStatus;

    /**
     * 插件包 默认0  delete :1
     */
    private Byte isDel;

    /**
     * 积分
     */
    private Integer price;

    /**
     * 
     */
    private Date createdAt;

    /**
     * 
     */
    private Date updatedAt;

    /**
     * 标签数组
     */
    private String labelIds;

    /**
     * 封面图
     */
    private String coverUrl;

    /**
     * 介绍
     */
    private String introduction;

    /**
     * 图片数组
     */
    private String imageUrls;

    /**
     * 视频地址
     */
    private String videoUrl;

    /**
     * 服务包地址
     */
    private String serviceboxUrl;

    /**
     * 应用包地址
     */
    private String appboxUrl;

    /**
     * applications
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
     * Status 状态 默认0 待审核  1审核通过 2 审核失败 
     * @return status Status 状态 默认0 待审核  1审核通过 2 审核失败 
     */
    public Byte getStatus() {
        return status;
    }

    /**
     * Status 状态 默认0 待审核  1审核通过 2 审核失败 
     * @param status Status 状态 默认0 待审核  1审核通过 2 审核失败 
     */
    public void setStatus(Byte status) {
        this.status = status;
    }

    /**
     * 版本号
     * @return version 版本号
     */
    public String getVersion() {
        return version;
    }

    /**
     * 版本号
     * @param version 版本号
     */
    public void setVersion(String version) {
        this.version = version == null ? null : version.trim();
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
     * 下载次数
     * @return download_count 下载次数
     */
    public Integer getDownloadCount() {
        return downloadCount;
    }

    /**
     * 下载次数
     * @param downloadCount 下载次数
     */
    public void setDownloadCount(Integer downloadCount) {
        this.downloadCount = downloadCount;
    }

    /**
     * 购买次数
     * @return buy_count 购买次数
     */
    public Integer getBuyCount() {
        return buyCount;
    }

    /**
     * 购买次数
     * @param buyCount 购买次数
     */
    public void setBuyCount(Integer buyCount) {
        this.buyCount = buyCount;
    }

    /**
     * 服务包上传状态 默认0未 1 2 失败
     * @return servicebox_status 服务包上传状态 默认0未 1 2 失败
     */
    public Byte getServiceboxStatus() {
        return serviceboxStatus;
    }

    /**
     * 服务包上传状态 默认0未 1 2 失败
     * @param serviceboxStatus 服务包上传状态 默认0未 1 2 失败
     */
    public void setServiceboxStatus(Byte serviceboxStatus) {
        this.serviceboxStatus = serviceboxStatus;
    }

    /**
     * 上架 默认1 下架2 上架1
     * @return is_shelf 上架 默认1 下架2 上架1
     */
    public Byte getIsShelf() {
        return isShelf;
    }

    /**
     * 上架 默认1 下架2 上架1
     * @param isShelf 上架 默认1 下架2 上架1
     */
    public void setIsShelf(Byte isShelf) {
        this.isShelf = isShelf;
    }

    /**
     * 应用包 默认0  1  2
     * @return appbox_status 应用包 默认0  1  2
     */
    public Byte getAppboxStatus() {
        return appboxStatus;
    }

    /**
     * 应用包 默认0  1  2
     * @param appboxStatus 应用包 默认0  1  2
     */
    public void setAppboxStatus(Byte appboxStatus) {
        this.appboxStatus = appboxStatus;
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
     * 积分
     * @return price 积分
     */
    public Integer getPrice() {
        return price;
    }

    /**
     * 积分
     * @param price 积分
     */
    public void setPrice(Integer price) {
        this.price = price;
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
     * 标签数组
     * @return label_ids 标签数组
     */
    public String getLabelIds() {
        return labelIds;
    }

    /**
     * 标签数组
     * @param labelIds 标签数组
     */
    public void setLabelIds(String labelIds) {
        this.labelIds = labelIds == null ? null : labelIds.trim();
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
     * 介绍
     * @return introduction 介绍
     */
    public String getIntroduction() {
        return introduction;
    }

    /**
     * 介绍
     * @param introduction 介绍
     */
    public void setIntroduction(String introduction) {
        this.introduction = introduction == null ? null : introduction.trim();
    }

    /**
     * 图片数组
     * @return image_urls 图片数组
     */
    public String getImageUrls() {
        return imageUrls;
    }

    /**
     * 图片数组
     * @param imageUrls 图片数组
     */
    public void setImageUrls(String imageUrls) {
        this.imageUrls = imageUrls == null ? null : imageUrls.trim();
    }

    /**
     * 视频地址
     * @return video_url 视频地址
     */
    public String getVideoUrl() {
        return videoUrl;
    }

    /**
     * 视频地址
     * @param videoUrl 视频地址
     */
    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl == null ? null : videoUrl.trim();
    }

    /**
     * 服务包地址
     * @return servicebox_url 服务包地址
     */
    public String getServiceboxUrl() {
        return serviceboxUrl;
    }

    /**
     * 服务包地址
     * @param serviceboxUrl 服务包地址
     */
    public void setServiceboxUrl(String serviceboxUrl) {
        this.serviceboxUrl = serviceboxUrl == null ? null : serviceboxUrl.trim();
    }

    /**
     * 应用包地址
     * @return appbox_url 应用包地址
     */
    public String getAppboxUrl() {
        return appboxUrl;
    }

    /**
     * 应用包地址
     * @param appboxUrl 应用包地址
     */
    public void setAppboxUrl(String appboxUrl) {
        this.appboxUrl = appboxUrl == null ? null : appboxUrl.trim();
    }
}