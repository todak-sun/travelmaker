package com.travelmaker.essay.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class EssayImageDTO {
   private int ino;
   private int rno;
   private String imagename;
   private MultipartFile file;
}
