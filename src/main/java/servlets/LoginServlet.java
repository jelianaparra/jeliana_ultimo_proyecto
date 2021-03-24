package servlets;

import java.io.IOException;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import controllers.UserController;
import models.Response;
import models.User;
import helpers.Encryptor;

@JsonInclude(JsonInclude.Include.NON_NULL)
@WebServlet(urlPatterns = "/login", name = "Login Servlet")
public class LoginServlet extends HttpServlet {
  private static final long serialVersionUID = 1L;

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    ObjectMapper mapper = new ObjectMapper();
    String json = req.getReader().lines().collect(Collectors.joining());
    User user = mapper.readValue(json, User.class);

    user.setPassword(Encryptor.getSHA256(user.getPassword(), user.getUsername().toLowerCase()));

    Response<User> response = UserController.login(user);

    if(response.getStatus() == 200) {
      HttpSession session = req.getSession();
      session.setAttribute("usuario_id", user.getId());
      session.setAttribute("usuario", user.getUsername().toLowerCase());
    }
    mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
    resp.setStatus(response.getStatus());
    resp.getWriter().print(mapper.writeValueAsString(response));
  }
}