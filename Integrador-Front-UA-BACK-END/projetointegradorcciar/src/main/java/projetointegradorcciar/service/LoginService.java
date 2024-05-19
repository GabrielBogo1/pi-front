// package projetointegradorcciar.service;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// import io.jsonwebtoken.lang.Assert;
// import projetointegradorcciar.config.JwtServiceGenerator;
// import projetointegradorcciar.dto.AdministradorDTO;
// import projetointegradorcciar.dto.LoginDTO;
// import projetointegradorcciar.entity.Administrador;
// import projetointegradorcciar.repository.LoginRepository;

// @Service
// public class LoginService {

//     @Autowired
//     private LoginRepository repository;
//     @Autowired
//     private JwtServiceGenerator jwtService;
//     @Autowired
//     private AuthenticationManager authenticationManager;
//     @Autowired
//     private PasswordEncoder passwordEncoder;

//     public AdministradorDTO logar(LoginDTO loginDTO) {
//         authenticationManager.authenticate(
//                 new UsernamePasswordAuthenticationToken(
//                         loginDTO.getUsername(),
//                         loginDTO.getPassword()
//                         )
//                 );
//         Administrador user = repository.findByUsername(loginDTO.getUsername()).orElseThrow();
//         var jwtToken = jwtService.generateToken(user);

//         return toUserDTO(user, jwtToken);
//     }


//     private AdministradorDTO toUserDTO(Administrador user, String token) {
//         AdministradorDTO userDTO = new AdministradorDTO();
//         userDTO.setId(user.getId());
//         userDTO.setRole(user.getRole());
//         userDTO.setToken(token);
//         userDTO.setUsername(user.getUsername());
//         return userDTO;
//     }

//     public AdministradorDTO include(Administrador user) {
//         Assert.notNull(user.getUsername(), "Username não informado!");
//         Assert.notNull(user.getPassword(), "Password não informado!");
//         Assert.notNull(user.getRole(), "Role não informada!");


//         user.setPassword(passwordEncoder.encode(user.getPassword()));

//         AdministradorDTO userDTO = new AdministradorDTO();
//         userDTO.setUsername(user.getUsername());
//         userDTO.setRole(user.getRole());
//         userDTO.setToken(user.getPassword());

//         repository.save(user);

//         return userDTO;
//     }
// }
