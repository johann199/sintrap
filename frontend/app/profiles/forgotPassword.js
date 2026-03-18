import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from "react-native"
import { useRouter } from "expo-router"
import { FontAwesome, MaterialIcons } from "@expo/vector-icons"
import { resetPassword, verifyResetCode } from "../../services/auth"

export default function ForgotPassword({ navigation }) {

  const [email, setEmail] = useState("")
  const [token, settoken] = useState("")
  const [paso, setPaso] = useState("correo")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Enviar código OTP al correo
  const handleEnviartoken = async () => {
    if (!email) {
      alert("Ingresa tu correo electrónico.")
      return
    }

    setLoading(true)
    const { error } = await resetPassword(email)
    setLoading(false)

    if (error) {
      alert("Error: " + error.message)
    } else {
      setPaso("token")
    }
  }

  // verificar OTP
  const handleVerificartoken = async () => {
    if (token.length < 8) {
      alert("Ingresa el código de 8 dígitos.")
      return
    }

    setLoading(true)
    const { error } = await verifyResetCode(email, token)
    setLoading(false)

    if (error) {
      alert("Código incorrecto o expirado.")
    } else {
      router.push("/resetPassword")
    }
  }

  return (
    <View style={styles.container}>

      {/* Icono */}
      <View style={styles.iconContainer}>
        <FontAwesome name="map-marker" size={60} color="#444" />
        <FontAwesome name="bus" size={24} color="#fff" style={styles.busIcon} />
      </View>

      <Text style={styles.title}>Recuperar contraseña</Text>

      {/* Card */}
      <View style={styles.card}>

        {paso === "correo" ? (
          <>
            <View style={styles.inputContainer}>
              <MaterialIcons name="email" size={20} color="#444" />
              <TextInput
                placeholder="Correo electrónico"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleEnviartoken}
              disabled={loading}
            >
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.buttonText}>Enviar código</Text>
              }
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.tokenInfo}>
              Ingresa el código que enviamos a{"\n"}
              <Text style={styles.tokenEmail}>{email}</Text>
            </Text>

            <View style={styles.inputContainer}>
              <MaterialIcons name="lock" size={20} color="#444" />
              <TextInput
                placeholder="Código de 8 dígitos"
                style={[styles.input, styles.inputtoken]}
                value={token}
                onChangeText={settoken}
                keyboardType="number-pad"
                maxLength={8}
              />
            </View>

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleVerificartoken}
              disabled={loading}
            >
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.buttonText}>Verificar</Text>
              }
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleEnviartoken}
              style={styles.reenviarBtn}
              disabled={loading}
            >
              <Text style={styles.reenviarTexto}>¿No llegó? Reenviar código</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.back}>Volver al login</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#d9d9d9",
    alignItems: "center",
    justifyContent: "center",
  },

  iconContainer: {
    alignItems: "center",
    marginBottom: 10,
  },

  busIcon: {
    position: "absolute",
    top: 18,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    width: "85%",
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    padding: 25,
    alignItems: "center",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
    width: "100%",
    height: 45,
  },

  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 15,
    color: "#111",
  },

  inputtoken: {
    letterSpacing: 4,
    fontSize: 18,
  },

  button: {
    backgroundColor: "#0d5b0d",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    minWidth: 160,
    alignItems: "center",
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  tokenInfo: {
    fontSize: 14,
    color: "#444",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 20,
  },

  tokenEmail: {
    fontWeight: "bold",
    color: "#111",
  },

  reenviarBtn: {
    marginTop: 12,
    marginBottom: 4,
  },

  reenviarTexto: {
    color: "#2563EB",
    fontWeight: "500",
    fontSize: 14,
  },

  back: {
    marginTop: 15,
    color: "#8B0000",
    fontWeight: "bold",
  },

})