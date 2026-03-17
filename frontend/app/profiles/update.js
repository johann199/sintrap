// Este archivo existe para que Expo Router no lance el warning
// "missing default export". La edición de perfil se maneja
// internamente desde el componente ProfileCard → EditarPerfilForm.
import { View } from "react-native";
export default function Update() {
  return <View />;
}