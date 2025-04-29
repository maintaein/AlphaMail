package com.alphamail.api.user.domain.valueobject;

import lombok.Value;

// 값 객체 Vo(Value Object)
@Value
public class UserId {
    Integer value;

    public static UserId of(Integer value) {
        return new UserId(value);
    }
    public boolean isNull() {
        return value == null;
    }
}
