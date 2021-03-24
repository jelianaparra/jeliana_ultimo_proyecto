package models;

import java.sql.Date;
import java.sql.Timestamp;

public class  User {
  private Integer id;
  private String usuario;
  private String pass;
  private String nombre;
  private String apellido;
  private String correo;
  private String telefono;
  private String edad;
  private String ubicacion;
  private String genero;


  public Integer getId() { return id; }

  public String getPass() {
    return pass;
  }

  public String getUsuario() {
    return usuario;
  }

  public String getNombre() {
    return nombre;
  }

  public String getCorreo() {
    return correo;
  }

  public String getApellido() {
    return apellido;
  }

  public String getTelefono(){
    return telefono;
  }
  public String getEdad(){
    return edad;
  }

  public String getUbicacion(){
    return ubicacion;
  }
  public String getGenero(){
    return genero;
  }

  public void setPass(String pass) { this.pass = pass; }

  public void setUsuario(String usuario) {
    this.usuario = usuario;
  }

  public void setCorreo(String correo) {
    this.correo = correo;
  }

  public void setApellido(String apellido) {
    this.apellido = apellido;
  }

  public void setNombre(String nombre) {
    this.nombre = nombre;
  }

  public void setTelefono(String telefono){
    this.tel = tel;
  }

  public void setGenero(String genero){
    this.genero=genero;
  }
  public void setUbicacion(String ubicacion){
    this.ubicacion=ubicacion;
  }
  public void setId(Integer id) { this.id = id; }
}

