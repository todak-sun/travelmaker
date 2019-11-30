package com.travelmaker.story.controller;


<<<<<<< Updated upstream
import java.util.List;
=======
>>>>>>> Stashed changes
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

<<<<<<< Updated upstream
import com.travelmaker.story.domain.StoryDTO;
import com.travelmaker.story.domain.StorySearchFilter;
=======
>>>>>>> Stashed changes
import com.travelmaker.story.service.StoryService;

@RequestMapping(value = "/story")
@Controller
public class StoryPageController {
	
	@Autowired
	StoryService storyService;
	
	// 처음 & 뒤로가기 등 모든 리스트 불러올 때
	@GetMapping(path = {"","/{listNum}/","/{listNum}/{keyword}"})
	public String showList(Model model, @PathVariable Optional<Integer> listNum, @PathVariable Optional<String> keyword) {
<<<<<<< Updated upstream
		
		System.out.println("showList 처음 들어올때  listNum.isPresent : "+listNum);
		System.out.println("showList 처음 들어올때  keyword.isPresent : "+keyword);
		
		StorySearchFilter storySearchFilter = new StorySearchFilter();
		storySearchFilter.setStart(1);
		storySearchFilter.setEnd(listNum.isPresent() ? listNum.get() : 12);
		storySearchFilter.setKeyword(keyword.isPresent() ? keyword.get() : "");
		
		List<StoryDTO> storyList = storyService.getStory(storySearchFilter);
		System.out.println("가져온게시글 수 : "+storyList.size());
		
		model.addAttribute("listNum",listNum.isPresent() ? listNum.get() : 12);
		model.addAttribute("keyword",keyword.isPresent() ? keyword.get() : "");
		// 처음 페이지 띄워줄 리스트
		model.addAttribute("storyList",storyList);
		
=======
	
		model.addAttribute("listNum",listNum.isPresent() ? listNum.get() : 12);
		model.addAttribute("keyword",keyword.isPresent() ? keyword.get() : "");
>>>>>>> Stashed changes
		return "/story/list";
	}

}
