package server;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

    @RequestMapping({ "/projekteSchueler", "/kompetenzen", "/qualifikationen", "/projekteLehrer", "/match" })
    public String index() {
        return "forward:/index.html";
    }
}