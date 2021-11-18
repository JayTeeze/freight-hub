package com.jayteeze.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.jayteeze.entity.Message;
import com.jayteeze.repository.MessageRepository;

@CrossOrigin
@RestController
public class MessageController {
	
	@Autowired
	MessageRepository messageRepository;
	
	@RequestMapping(value="/sendNewMessage", 
			 consumes=MediaType.APPLICATION_JSON_VALUE, 
			 produces=MediaType.APPLICATION_JSON_VALUE,
			 method= RequestMethod.POST)
	private void sendNewMessage(@RequestBody Message message) {
		messageRepository.save(message);
	}
	
	@RequestMapping(value="/findUserMessages", 
			 produces=MediaType.APPLICATION_JSON_VALUE,
			 method= RequestMethod.GET)
	@ResponseBody
	private ResponseEntity<List<Message>> findUserMessages(Integer userId) {
		List<Message> messages = messageRepository.findUserMessages(userId);
		return new ResponseEntity<>(messages, HttpStatus.OK);
	}
	
	@RequestMapping(value="/deleteSelectedMessage", 
			 produces=MediaType.APPLICATION_JSON_VALUE,
			 method= RequestMethod.GET)
	@ResponseBody
	private void deleteSelectedMessage(Integer id) {
		messageRepository.deleteMessage(id);
	}

}
