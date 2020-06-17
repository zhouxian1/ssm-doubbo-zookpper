package com.geovis.ai.model;

import java.io.Serializable;
import java.util.Date;

public class Samples implements Serializable {
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
     * 分类id
     */
    private Byte classificationId;

    /**
     * 第三方样本id
     */
    private String datasetId;

    /**
     * 分辨率
     */
    private String resolution;

    /**
     * 图像大小
     */
    private String size;

    /**
     * 坐标信息
     */
    private String coordinate;

    /**
     * 生产时间
     */
    private Date productionTime;

    /**
     * 购买积分
     */
    private Integer price;

    /**
     * 评分
     */
    private Integer starRating;

    /**
     * 评论数
     */
    private Integer commentCount;

    /**
     * 购买次数
     */
    private Integer buyCount;

    /**
     * 算法数
     */
    private Integer algorithmsCount;

    /**
     * Status 状态 默认0 待审核  1审核通过 2 审核失败 
     */
    private Byte status;

    /**
     * 默认0  delete :1
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
     * 样本用途
     */
    private String category;

    /**
     * 来源方式
     */
    private String sourceType;

    /**
     * 数据来源
     */
    private String dataSource;

    /**
     * 成像类型
     */
    private String imagingType;

    /**
     * 图片数组
     */
    private String imageUrls;

    /**
     * 介绍
     */
    private String introduction;

    /**
     * samples
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
     * 分类id
     * @return classification_id 分类id
     */
    public Byte getClassificationId() {
        return classificationId;
    }

    /**
     * 分类id
     * @param classificationId 分类id
     */
    public void setClassificationId(Byte classificationId) {
        this.classificationId = classificationId;
    }

    /**
     * 第三方样本id
     * @return dataset_id 第三方样本id
     */
    public String getDatasetId() {
        return datasetId;
    }

    /**
     * 第三方样本id
     * @param datasetId 第三方样本id
     */
    public void setDatasetId(String datasetId) {
        this.datasetId = datasetId == null ? null : datasetId.trim();
    }

    /**
     * 分辨率
     * @return resolution 分辨率
     */
    public String getResolution() {
        return resolution;
    }

    /**
     * 分辨率
     * @param resolution 分辨率
     */
    public void setResolution(String resolution) {
        this.resolution = resolution == null ? null : resolution.trim();
    }

    /**
     * 图像大小
     * @return size 图像大小
     */
    public String getSize() {
        return size;
    }

    /**
     * 图像大小
     * @param size 图像大小
     */
    public void setSize(String size) {
        this.size = size == null ? null : size.trim();
    }

    /**
     * 坐标信息
     * @return coordinate 坐标信息
     */
    public String getCoordinate() {
        return coordinate;
    }

    /**
     * 坐标信息
     * @param coordinate 坐标信息
     */
    public void setCoordinate(String coordinate) {
        this.coordinate = coordinate == null ? null : coordinate.trim();
    }

    /**
     * 生产时间
     * @return production_time 生产时间
     */
    public Date getProductionTime() {
        return productionTime;
    }

    /**
     * 生产时间
     * @param productionTime 生产时间
     */
    public void setProductionTime(Date productionTime) {
        this.productionTime = productionTime;
    }

    /**
     * 购买积分
     * @return price 购买积分
     */
    public Integer getPrice() {
        return price;
    }

    /**
     * 购买积分
     * @param price 购买积分
     */
    public void setPrice(Integer price) {
        this.price = price;
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
     * 算法数
     * @return algorithms_count 算法数
     */
    public Integer getAlgorithmsCount() {
        return algorithmsCount;
    }

    /**
     * 算法数
     * @param algorithmsCount 算法数
     */
    public void setAlgorithmsCount(Integer algorithmsCount) {
        this.algorithmsCount = algorithmsCount;
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
     * 默认0  delete :1
     * @return is_del 默认0  delete :1
     */
    public Byte getIsDel() {
        return isDel;
    }

    /**
     * 默认0  delete :1
     * @param isDel 默认0  delete :1
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
     * 样本用途
     * @return category 样本用途
     */
    public String getCategory() {
        return category;
    }

    /**
     * 样本用途
     * @param category 样本用途
     */
    public void setCategory(String category) {
        this.category = category == null ? null : category.trim();
    }

    /**
     * 来源方式
     * @return source_type 来源方式
     */
    public String getSourceType() {
        return sourceType;
    }

    /**
     * 来源方式
     * @param sourceType 来源方式
     */
    public void setSourceType(String sourceType) {
        this.sourceType = sourceType == null ? null : sourceType.trim();
    }

    /**
     * 数据来源
     * @return data_source 数据来源
     */
    public String getDataSource() {
        return dataSource;
    }

    /**
     * 数据来源
     * @param dataSource 数据来源
     */
    public void setDataSource(String dataSource) {
        this.dataSource = dataSource == null ? null : dataSource.trim();
    }

    /**
     * 成像类型
     * @return imaging_type 成像类型
     */
    public String getImagingType() {
        return imagingType;
    }

    /**
     * 成像类型
     * @param imagingType 成像类型
     */
    public void setImagingType(String imagingType) {
        this.imagingType = imagingType == null ? null : imagingType.trim();
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
}