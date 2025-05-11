package com.Bits.StudentVacinationPortal.dto;

public class SVPResponseDTO {

	String statusCode;
	String statusMessage;
	Object response;

	public String getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(final String statusCode) {
		this.statusCode = statusCode;
	}

	public String getStatusMessage() {
		return statusMessage;
	}

	public void setStatusMessage(final String statusMessage) {
		this.statusMessage = statusMessage;
	}

	public Object getResponse() {
		return response;
	}

	public void setResponse(final Object response) {
		this.response = response;
	}

	public SVPResponseDTO() {
		super();
	}

	public SVPResponseDTO(final String statusCode, final String statusMessage, final Object response) {
		super();
		this.statusCode = statusCode;
		this.statusMessage = statusMessage;
		this.response = response;
	}

	public SVPResponseDTO(final String statusCode, final String statusMessage) {
		super();
		this.statusCode = statusCode;
		this.statusMessage = statusMessage;
	}

}
