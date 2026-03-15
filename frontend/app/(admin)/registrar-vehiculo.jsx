import { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, Modal, 
         TouchableOpacity, FlatList, ActivityIndicator, 
         Alert, ScrollView } from 'react-native';
import { router } from 'expo-router';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { getProfile } from '../../services/profileService';
import { getCurrentUser } from '../../services/auth';
import { getAvailableDrivers, registerVehicle } from '../../services/vehicleService';
import theme from '../../constants/theme';

const T = theme.lightMode;

export default function RegistrarVehiculo() {
  const [placa,            setPlaca]            = useState('');
  const [seguro,           setSeguro]           = useState(false);
  const [conductorId,      setConductorId]      = useState(null);
  const [conductorNombre,  setConductorNombre]  = useState('Seleccionar conductor');
  const [conductores,      setConductores]      = useState([]);
  const [modalVisible,     setModalVisible]     = useState(false);
  const [cargando,         setCargando]         = useState(false);
  const [usuarioPerfil,    setUsuarioPerfil]    = useState(null);

  // ── Cargar usuario logueado y conductores ─────────────────
  useEffect(() => {
    const inicializar = async () => {
      try {
        // Obtener usuario logueado
        const user = await getCurrentUser();
        const perfil = await getProfile(user.id);
        setUsuarioPerfil(perfil);

        // Obtener conductores disponibles
        const drivers = await getAvailableDrivers();
        setConductores(drivers);
      } catch (error) {
        Alert.alert('Error', 'No se pudo cargar la información');
      }
    };
    inicializar();
  }, []);

  // ── Validaciones ──────────────────────────────────────────
  const validar = () => {
    if (!placa.trim()) {
      Alert.alert('Error', 'La placa es obligatoria');
      return false;
    }
    if (!conductorId) {
      Alert.alert('Error', 'Debes seleccionar un conductor');
      return false;
    }
    return true;
  };

  // ── Guardar vehículo ──────────────────────────────────────
  const handleGuardar = async () => {
    if (!validar()) return;
    setCargando(true);
    try {
      await registerVehicle({
        placa:        placa.trim().toUpperCase(),
        seguro:       seguro,
        conductor_id: conductorId,
      });
      Alert.alert('¡Éxito!', 'Vehículo registrado', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar el vehículo');
    } finally {
      setCargando(false);
    }
  };

  const seleccionarConductor = (conductor) => {
    setConductorId(conductor.id);
    setConductorNombre(conductor.nombre_completo);
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>

      <Text style={styles.titulo}>Registrar Vehículo</Text>

      {/* Input Placa */}
      <Input
        label="Placa"
        placeholder="Ej: ABC123"
        value={placa}
        onChangeText={(text) => setPlaca(text.toUpperCase())}
      />

      {/* Switch Seguro */}
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>¿Tiene seguro?</Text>
        <Switch
          value={seguro}
          onValueChange={setSeguro}
          trackColor={{ false: T.input.border, true: T.Button.primary.background }}
          thumbColor="#fff"
        />
      </View>

      {/* Picker Conductor */}
      <Text style={styles.label}>Conductor</Text>
      <TouchableOpacity style={styles.picker} onPress={() => setModalVisible(true)}>
        <Text style={[styles.pickerText, conductorId && styles.pickerTextSelected]}>
          {conductorNombre}
        </Text>
      </TouchableOpacity>

      {/* Botón Guardar */}
      <View style={styles.boton}>
        {cargando
          ? <ActivityIndicator size="large" color={T.Button.primary.background} />
          : <Button label="Registrar Vehículo" onPress={handleGuardar} />
        }
      </View>

      <Button label="Cancelar" onPress={() => router.back()} />

      {/* Modal conductores */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>Seleccionar Conductor</Text>
            <FlatList
              data={conductores}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => seleccionarConductor(item)}>
                  <Text style={styles.modalItemText}>{item.nombre_completo}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.vacio}>No hay conductores disponibles</Text>
              }
            />
            <Button label="Cerrar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll:      { flex: 1, backgroundColor: T.background },
  container:   { padding: 24, paddingBottom: 48 },
  titulo:      { fontSize: 22, fontWeight: 'bold', color: T.text.primary, marginBottom: 24 },
  label:       { fontSize: 14, color: T.text.secondary, marginBottom: 6, marginTop: 12 },
  switchRow:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: T.cards.background, borderWidth: 1, borderColor: T.cards.border, borderRadius: T.cards.borderRadius, padding: 14, marginVertical: 12 },
  switchLabel: { fontSize: 16, color: T.text.primary },
  picker:      { backgroundColor: T.input.background, borderWidth: 1, borderColor: T.input.border, borderRadius: T.input.borderRadius, padding: 14, marginBottom: 24 },
  pickerText:  { color: T.input.placeholder, fontSize: 16 },
  pickerTextSelected: { color: T.input.text },
  boton:       { marginBottom: 12 },
  modalOverlay:   { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContainer: { backgroundColor: T.cards.background, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '60%' },
  modalTitulo:    { fontSize: 18, fontWeight: 'bold', color: T.text.primary, marginBottom: 16 },
  modalItem:      { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: T.cards.border },
  modalItemText:  { fontSize: 16, color: T.text.primary },
  vacio:          { textAlign: 'center', color: T.text.tertiary, padding: 24 },
});