package com.jayteeze.entity;

import javax.persistence.*;

@Entity
@Table(name="message")
public class Message {
	
	@Id
	@Column(name="id")
	private int id;
	@Column(name="to_user_id")
	private int toUserId;
	@Column(name="from_user_id")
	private int fromUserId;
	@Column(name="message_body")
	private String messageBody;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="to_user_id", insertable=false, updatable=false)
	private User recipient;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="from_user_id", insertable=false, updatable=false)
	private User author;
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public int getToUserId() {
		return toUserId;
	}
	
	public void setToUserId(int toUserId) {
		this.toUserId = toUserId;
	}
	
	public int getFromUserId() {
		return fromUserId;
	}
	
	public void setFromUserId(int fromUserId) {
		this.fromUserId = fromUserId;
	}
	
	public String getMessageBody() {
		return messageBody;
	}
	
	public void setMessageBody(String messageBody) {
		this.messageBody = messageBody;
	}

	public User getRecipient() {
		return recipient;
	}

	public void setRecipient(User recipient) {
		this.recipient = recipient;
	}

	public User getAuthor() {
		return author;
	}

	public void setAuthor(User author) {
		this.author = author;
	}

}
