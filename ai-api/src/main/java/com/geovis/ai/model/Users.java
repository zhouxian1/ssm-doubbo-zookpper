package com.geovis.ai.model;

import java.io.Serializable;
import java.util.Date;

public class Users implements Serializable {
    /**
     * 
     */
    private Integer id;

    /**
     * 用户id
     */
    private Long userId;

    /**
     * 用户名
     */
    private String userName;

    /**
     * 性别
     */
    private String sex;

    /**
     * 邮箱
     */
    private String email;

    /**
     * 手机号码
     */
    private String phone;

    /**
     * 昵称
     */
    private String nickname;

    /**
     * 用户头像
     */
    private String avatarUrl;

    /**
     * 所在公司
     */
    private String company;

    /**
     * 所在职位
     */
    private String position;

    /**
     * 真实姓名
     */
    private String actualName;

    /**
     * 身份证号
     */
    private String idCardNum;

    /**
     * 身份证图片
     */
    private String idCardUrl;

    /**
     * 公司名称
     */
    private String businessName;

    /**
     * 统一社会信用代码
     */
    private String businessLicenseNum;

    /**
     * 营业执照图片
     */
    private String businessLicenseUrl;

    /**
     * 类型id
     */
    private Integer typeId;

    /**
     * 状态
     */
    private Integer status;

    /**
     * 
     */
    private Date createdAt;

    /**
     * 
     */
    private Date updatedAt;

    /**
     * 签名
     */
    private String signature;

    /**
     * users
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
     * 用户id
     * @return user_id 用户id
     */
    public Long getUserId() {
        return userId;
    }

    /**
     * 用户id
     * @param userId 用户id
     */
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    /**
     * 用户名
     * @return user_name 用户名
     */
    public String getUserName() {
        return userName;
    }

    /**
     * 用户名
     * @param userName 用户名
     */
    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName.trim();
    }

    /**
     * 性别
     * @return sex 性别
     */
    public String getSex() {
        return sex;
    }

    /**
     * 性别
     * @param sex 性别
     */
    public void setSex(String sex) {
        this.sex = sex == null ? null : sex.trim();
    }

    /**
     * 邮箱
     * @return email 邮箱
     */
    public String getEmail() {
        return email;
    }

    /**
     * 邮箱
     * @param email 邮箱
     */
    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    /**
     * 手机号码
     * @return phone 手机号码
     */
    public String getPhone() {
        return phone;
    }

    /**
     * 手机号码
     * @param phone 手机号码
     */
    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

    /**
     * 昵称
     * @return nickname 昵称
     */
    public String getNickname() {
        return nickname;
    }

    /**
     * 昵称
     * @param nickname 昵称
     */
    public void setNickname(String nickname) {
        this.nickname = nickname == null ? null : nickname.trim();
    }

    /**
     * 用户头像
     * @return avatar_url 用户头像
     */
    public String getAvatarUrl() {
        return avatarUrl;
    }

    /**
     * 用户头像
     * @param avatarUrl 用户头像
     */
    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl == null ? null : avatarUrl.trim();
    }

    /**
     * 所在公司
     * @return company 所在公司
     */
    public String getCompany() {
        return company;
    }

    /**
     * 所在公司
     * @param company 所在公司
     */
    public void setCompany(String company) {
        this.company = company == null ? null : company.trim();
    }

    /**
     * 所在职位
     * @return position 所在职位
     */
    public String getPosition() {
        return position;
    }

    /**
     * 所在职位
     * @param position 所在职位
     */
    public void setPosition(String position) {
        this.position = position == null ? null : position.trim();
    }

    /**
     * 真实姓名
     * @return actual_name 真实姓名
     */
    public String getActualName() {
        return actualName;
    }

    /**
     * 真实姓名
     * @param actualName 真实姓名
     */
    public void setActualName(String actualName) {
        this.actualName = actualName == null ? null : actualName.trim();
    }

    /**
     * 身份证号
     * @return ID_card_num 身份证号
     */
    public String getIdCardNum() {
        return idCardNum;
    }

    /**
     * 身份证号
     * @param idCardNum 身份证号
     */
    public void setIdCardNum(String idCardNum) {
        this.idCardNum = idCardNum == null ? null : idCardNum.trim();
    }

    /**
     * 身份证图片
     * @return ID_card_url 身份证图片
     */
    public String getIdCardUrl() {
        return idCardUrl;
    }

    /**
     * 身份证图片
     * @param idCardUrl 身份证图片
     */
    public void setIdCardUrl(String idCardUrl) {
        this.idCardUrl = idCardUrl == null ? null : idCardUrl.trim();
    }

    /**
     * 公司名称
     * @return business_name 公司名称
     */
    public String getBusinessName() {
        return businessName;
    }

    /**
     * 公司名称
     * @param businessName 公司名称
     */
    public void setBusinessName(String businessName) {
        this.businessName = businessName == null ? null : businessName.trim();
    }

    /**
     * 统一社会信用代码
     * @return business_license_num 统一社会信用代码
     */
    public String getBusinessLicenseNum() {
        return businessLicenseNum;
    }

    /**
     * 统一社会信用代码
     * @param businessLicenseNum 统一社会信用代码
     */
    public void setBusinessLicenseNum(String businessLicenseNum) {
        this.businessLicenseNum = businessLicenseNum == null ? null : businessLicenseNum.trim();
    }

    /**
     * 营业执照图片
     * @return business_license_url 营业执照图片
     */
    public String getBusinessLicenseUrl() {
        return businessLicenseUrl;
    }

    /**
     * 营业执照图片
     * @param businessLicenseUrl 营业执照图片
     */
    public void setBusinessLicenseUrl(String businessLicenseUrl) {
        this.businessLicenseUrl = businessLicenseUrl == null ? null : businessLicenseUrl.trim();
    }

    /**
     * 类型id
     * @return type_id 类型id
     */
    public Integer getTypeId() {
        return typeId;
    }

    /**
     * 类型id
     * @param typeId 类型id
     */
    public void setTypeId(Integer typeId) {
        this.typeId = typeId;
    }

    /**
     * 状态
     * @return status 状态
     */
    public Integer getStatus() {
        return status;
    }

    /**
     * 状态
     * @param status 状态
     */
    public void setStatus(Integer status) {
        this.status = status;
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
     * 签名
     * @return signature 签名
     */
    public String getSignature() {
        return signature;
    }

    /**
     * 签名
     * @param signature 签名
     */
    public void setSignature(String signature) {
        this.signature = signature == null ? null : signature.trim();
    }
}