package edu.asu.ser516.trinity.sbs.projectmanagement;

import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.Properties;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import kong.unirest.Unirest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

// @CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@SpringBootApplication
public class SbsProjectManagementApiApplication {

	public static void main(String[] args) {
            Unirest.config().verifySsl(false);
         SpringApplication.run(SbsProjectManagementApiApplication.class, args);
	}
        
}
