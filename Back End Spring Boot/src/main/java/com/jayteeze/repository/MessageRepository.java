package com.jayteeze.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.jayteeze.entity.Message;

@Transactional
@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
	
	@Query("SELECT M FROM Message M WHERE M.toUserId = ?1 OR M.fromUserId = ?1 ORDER BY M.id DESC")
	List<Message> findUserMessages(Integer userId);
	
	@Modifying
	@Query("DELETE Message M WHERE M.id = ?1")
	void deleteMessage(Integer messageId);

}
