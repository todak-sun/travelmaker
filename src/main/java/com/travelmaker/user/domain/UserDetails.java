package com.travelmaker.user.domain;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class UserDetails extends org.springframework.security.core.userdetails.User {

	private static final long serialVersionUID = -4855890427225819382L;
	private int seq;
	private String id;
	private String realname;
	private String nickname;
	private int gender;
	private String registerMethod;
	private String imgProfile;

	public UserDetails(String username, String password, Collection<? extends GrantedAuthority> authorities) {
		super(username, password, authorities);
		// TODO Auto-generated constructor stub
	}

	public UserDetails(User user,UserDTO userDTO){
		super(user.getUsername(), user.getPassword(), user.isAccountNonExpired(), user.isAccountNonLocked(), user.isCredentialsNonExpired(), user.isEnabled(), authorities(user));
		this.seq=userDTO.getSeq();
		this.id = userDTO.getId();
		this.realname = userDTO.getRealname();
		this.nickname = userDTO.getNickname();
		this.gender = userDTO.getGender();
		this.registerMethod = userDTO.getRegisterMethod();
		this.imgProfile = userDTO.getImgProfile();
	}

	public UserDetails(String username, String password, Collection<? extends GrantedAuthority> authorities,
			int seq) {
		super(username, password, authorities);
		// TODO Auto-generated constructor stub
	}
	
	public UserDetails(String username, String password, boolean enabled, boolean accountNonExpired,
			boolean credentialsNonExpired, boolean accountNonLocked,
			Collection<? extends GrantedAuthority> authorities) {
		super(username, password, authorities);
		// TODO Auto-generated constructor stub
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	

	public String getRealname() {
		return realname;
	}

	public void setRealname(String realname) {
		this.realname = realname;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public int getGender() {
		return gender;
	}

	public void setGender(int gender) {
		this.gender = gender;
	}

	public String getImgProfile() {
		return imgProfile;
	}

	public void setImgProfile(String imgProfile) {
		this.imgProfile = imgProfile;
	}

	public String getRegisterMethod() {
		return registerMethod;
	}

	public void setRegisterMethod(String registerMethod) {
		this.registerMethod = registerMethod;
	}

	public int getSeq() {
		return seq;
	}

	public void setSeq(int seq) {
		this.seq = seq;
	}
	
	private static Collection<? extends GrantedAuthority> authorities(User user) {
		// TODO Auto-generated method stub
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		user.getAuthorities().forEach(a -> {
			authorities.add(new SimpleGrantedAuthority(a.getAuthority()));
		});
		return authorities;
	}

	@Override
	public String toString() {
		return super.toString()+",SEQ : "+this.getSeq()+",realName : "+this.realname +",nickname : "+this.getNickname()
		+",img : "+this.imgProfile;
	}
	

}