package com.alphamail.api.user.infrastructure.mapping;


import com.alphamail.api.user.domain.User;
import com.alphamail.api.user.domain.valueobject.UserId;
import com.alphamail.api.user.infrastructure.entity.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(source = "userId", target = "id", qualifiedByName = "integerToUserId")
    User toDomain(UserEntity userEntity);

    @Mapping(source = "id", target = "userId", qualifiedByName = "userIdToInteger")
    UserEntity toEntity(User user);

    @Named("integerToUserId")
    default UserId integerToUserId(Integer userId) {
        return userId != null ? new UserId(userId) : null;
    }

    @Named("userIdToInteger")
    default Integer userIdToInteger(UserId userId) {
        return userId != null ? userId.getValue() : null;
    }
}