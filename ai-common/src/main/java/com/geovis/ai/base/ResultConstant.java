package com.geovis.ai.base;

/*200	已创建，请求成功且服务器已创建了新的资源。
201	是否只显示处于警告状态的应用实例
301	重定向 , 请求的网页已被永久移动到新位置。服务器返回此响应时，会自动将请求者转到新位置。
302	重定向 , 请求的网页临时移动到新位置，但求者应继续使用原有位置来进行以后的请求。302 会自动将请求者转到不同的临时位置。
304	未修改，自从上次请求后，请求的网页未被修改过。服务器返回此响应时，不会返回网页内容。
400	错误请求 , 服务器不理解请求的语法。
401	未授权 , 请求要求进行身份验证。
403	已禁止 , 服务器拒绝请求。
404	未找到 , 服务器找不到请求的网页。
405	方法禁用 , 禁用请求中所指定的方法。
406	不接受 , 无法使用请求的内容特性来响应请求的网页。
408	请求超时 , 服务器等候请求时超时。
410	已删除 , 如果请求的资源已被永久删除，那么，服务器会返回此响应。
412	未满足前提条件 , 服务器未满足请求者在请求中设置的其中一个前提条件。
415	不支持的媒体类型 , 请求的格式不受请求页面的支持。
500	内部服务器错误。*/
public enum ResultConstant {

    FAILED(500, "failed"),
    SUCCESS(200, "success"),

    INVALID_LENGTH(10001, "Invalid length"),

    EMPTY_USERNAME(10101, "Username cannot be empty"),
    EMPTY_PASSWORD(10102, "Password cannot be empty"),
    INVALID_USERNAME(10103, "Account does not exist"),
    INVALID_PASSWORD(10104, "Password error"),
    INVALID_ACCOUNT(10105, "Invalid account");

    public int code;

    public String message;

    ResultConstant(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
