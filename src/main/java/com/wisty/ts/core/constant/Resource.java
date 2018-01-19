package com.wisty.ts.core.constant;

public enum Resource {

	WE_CHAR(1, "微信"), QQ(2, "QQ"), SINA_BLOG(3, "微博");

	private Integer resource;

	private String name;

	private Resource(Integer resource, String name) {
		this.resource = resource;
		this.name = name;
	}

	public Integer getResource() {
		return resource;
	}

	public void setResource(Integer resource) {
		this.resource = resource;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public static String getName(Integer resource){
		for(Resource source : Resource.values()){
			if (source.getResource()==resource) {
				return source.getName();
			}
		}
		return "";
	}

}
