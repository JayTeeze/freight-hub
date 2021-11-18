package com.jayteeze.controller;

import java.util.List;
import java.util.Optional;

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

import com.jayteeze.entity.User;
import com.jayteeze.repository.UserRepository;

@CrossOrigin
@RestController
public class UserController {
	
	@Autowired
	UserRepository userRepository;
	
	@RequestMapping(value="/signUp", 
			 consumes=MediaType.APPLICATION_JSON_VALUE, 
			 produces=MediaType.APPLICATION_JSON_VALUE,
			 method= RequestMethod.POST)
	private void submitUserDetails(@RequestBody User user) {
		userRepository.save(user);
	}
	
	@RequestMapping(value="/login", 
			 consumes=MediaType.APPLICATION_JSON_VALUE, 
			 produces=MediaType.APPLICATION_JSON_VALUE,
			 method= RequestMethod.POST)
	private ResponseEntity<User> login(@RequestBody User credentials) {
		User account = userRepository.authenticate(credentials.getEmail(), credentials.getPassword());
		if (account != null) {
			return new ResponseEntity<>(account, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
	}
	
	@RequestMapping(value="/findUserById", 
			 produces=MediaType.APPLICATION_JSON_VALUE,
			 method= RequestMethod.GET)
	@ResponseBody
	private ResponseEntity<Optional<User>> findUser(Integer id) {
		Optional<User> user = userRepository.findById(id);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
	
	@RequestMapping(value="/findUserByEmail", 
			 consumes=MediaType.APPLICATION_JSON_VALUE, 
			 produces=MediaType.APPLICATION_JSON_VALUE,
			 method= RequestMethod.POST)
	private ResponseEntity<User> findUserByEmail(@RequestBody User email) {
		User account = userRepository.findByEmail(email.getEmail());
		if (account != null) {
			return new ResponseEntity<>(account, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@RequestMapping(value="/findAllUsers", 
			 produces=MediaType.APPLICATION_JSON_VALUE,
			 method= RequestMethod.GET)
	@ResponseBody
	private ResponseEntity<List<User>> findAllUsers() {
		List<User> users = userRepository.findAll();
		return new ResponseEntity<>(users, HttpStatus.OK);
	}
	
	@RequestMapping(value="/updateUserDetails", 
			 consumes=MediaType.APPLICATION_JSON_VALUE, 
			 produces=MediaType.APPLICATION_JSON_VALUE,
			 method= RequestMethod.POST)
	private void updateUser(@RequestBody User user) {
		userRepository.updateUser(user.getFirstName(), user.getLastName(), 
				user.getEmail(), user.getPassword(), user.getTelephone(), 
				user.getBusinessName(), user.getBusinessDescription(), 
				user.getWebsite(), user.getUserId());
	}
	
	@RequestMapping(value="/searchForUser", 
			 produces=MediaType.APPLICATION_JSON_VALUE,
			 method= RequestMethod.GET)
	@ResponseBody
	private ResponseEntity<List<User>> searchForUser(String searchParam) {
		List<User> searchResults = userRepository.searchForUser(searchParam);
		if (searchResults != null) {
			return new ResponseEntity<>(searchResults, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
