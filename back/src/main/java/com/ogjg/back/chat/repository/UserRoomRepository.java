package com.ogjg.back.chat.repository;

import com.ogjg.back.chat.domain.UserRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

import static com.ogjg.back.chat.domain.UserRoom.UserRoomPK;

public interface UserRoomRepository extends JpaRepository<UserRoom, UserRoomPK> {
    Optional<List<UserRoom>> findById_Email(String email);

    Optional<List<UserRoom>> findById_RoomId(Long roomId);
}