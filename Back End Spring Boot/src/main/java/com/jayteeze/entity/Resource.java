package com.jayteeze.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name="resource")
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="resourceId")
public class Resource {
	
	@Id
	@Column(name="resource_id")
	private int resourceId;
	@Column(name="type")
	private String type;
	@Column(name="description")
	private String description;
	@Column(name="quantity")
	private int quantity;
	@Column(name="user_id")
	private int userId;
	
	public int getResourceId() {
		return resourceId;
	}
	
	public void setResourceId(int resourceId) {
		this.resourceId = resourceId;
	}
	
	public String getType() {
		return type;
	}
	
	public void setType(String type) {
		this.type = type;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public int getQuantity() {
		return quantity;
	}
	
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}
	
}
