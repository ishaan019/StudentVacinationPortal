package com.Bits.StudentVacinationPortal.constant;

public class ApplicationResource {

	//HTTP Status code
	public static final String BAD_REQUEST = "400";
	public static final String METHOD_NOT_ALLOWED = "405";
	public static final String STATUS_CODE_SUCCESS = "200";
	public static final String STATUS_CODE_UNAUTHORIZED = "401";
	public static final String STATUS_CODE_NOT_FOUND = "404";
	public static final String UNSUPPORTED_MEDIA_TYPE = "415";
	public static final String STATUS_CODE_CONFLICT = "409";

	public static final String STATUS_MESSAGE = "SUCCESS";
	public static final String STATUS_ERROR = "ERROR";
	public static final String INTERNAL_SERVER_ERROR_MESSAGE = "Something Went Wrong";
	public static final String METHOD_NOT_SUPPORTED = "method is not supported for this request. Supported methods are";
	public static final String MEDIA_TYPE_NOT_SUPPORTED = " media type is not supported. Supported media types are ";
	public static final String SUCCESS_MESSAGE_USER_SIGNUP = "User registered successfully!";
	public static final String ERROR_MESSAGE = "Validation Failed";
	public static final String BEARER = "Bearer ";
	
	public static final String SUCCESSFUL_SIGNIN = "Successful SignIn";
	public static final String SUCCESSFUL_DELETION = "Deleted Successfully";
	public static final String SUCCESSFUL_ADDED = "Added Successfully";
	public static final String SUCCESSFUL_UPDATED = "Updated Successfully";
	
	
	public static final String SUCCESSFUL_ADDED_CLASS = "Class added Successfully";
	public static final String SUCCESSFUL_DELETION_CLASS = "Class deleted Successfully";
	
	public static final String SUCCESSFUL_ADDED_SECTION = "Section added Successfully";
	
	
	public static final String ERROR_MESSAGE_EMAIL_EXIST ="Email is already in use! ";
	public static final String ERROR_MESSAGE_ROLE_NOT_FOUND = "Role is not found.";
	public static final String ERROR_MESSAGE_ADMIN_APPROVAL = "{\"message\":\"" + "Wait for Admin Approval." + "\"}";
	public static final String ERROR_MESSAGE_BAD_CREDENTIALS= "{\"message\":\"" + "Bad Credentials." + "\"}";
	
	public static final String ERROR_MESSAGE_CLASS_ALREADY_EXISTS ="Class already exists";
	
	public static final String DEFAULT_PASSWORD = "Password@123";
	public static final String ROLE_ADMIN = "admin";
	public static final String ROLE_TEACHER = "teacher";
	public static final String ROLE_STUDENT = "student";
	public static final String ROLE_PARENTS = "parents";
	
	public static final String STATUS_ACTIVE = "User status is Active";
	public static final String STATUS_DEACTIVE = "User status is De-active";
	
	public static final String TEACHER_ASSIGNED = "Teacher Assigned successfully";


}
