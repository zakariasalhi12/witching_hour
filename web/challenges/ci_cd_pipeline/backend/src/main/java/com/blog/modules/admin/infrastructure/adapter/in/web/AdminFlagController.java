package com.blog.modules.admin.infrastructure.adapter.in.web;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/flag")
public class AdminFlagController {

    @Value("${CTF_ADMIN_FLAG:CyberZ{admin_flag}}")
    private String adminFlag;

    @GetMapping
    public Map<String, String> getFlag() {
        return Map.of("flag", adminFlag);
    }
}
