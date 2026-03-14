import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

/**
 * ProfileCard Component
 *
 * Props:
 * - name: string
 * - email: string
 * - isActive: boolean
 * - avatarUri: string | null
 * - role: "usuario" | "admin" | "conductor"
 * - onTripHistory: function
 * - onNotifications: function
 * - onEditProfile: function
 * - onSettings: function
 * - onChangePassword: function
 * - onLogout: function
 * --- Solo admin ---
 * - onManageUsers: function
 * - onReports: function
 * - onManageRoutes: function
 * --- Solo conductor ---
 * - onMyVehicle: function
 * - onAssignedRoutes: function
 * - onToggleService: function
 * - serviceActive: boolean
 */

const ProfileCard = ({
  name = "Nombre",
  email = "nombre@gmail.com",
  isActive = true,
  avatarUri = null,
  role = "usuario",
  onTripHistory,
  onNotifications,
  onEditProfile,
  onSettings,
  onChangePassword,
  onLogout,
  // Admin
  onManageUsers,
  onReports,
  onManageRoutes,
  // Conductor
  onMyVehicle,
  onAssignedRoutes,
  onToggleService,
  serviceActive = true,
}) => {
  const roleLabel = {
    usuario: "Usuario activo",
    admin: "Administrador",
    conductor: "Conductor",
  }[role];

  const roleBadgeColor = {
    usuario: { bg: "#E8F8EF", text: "#27AE60" },
    admin:   { bg: "#EAF0FB", text: "#2C6FE0" },
    conductor: { bg: "#FEF5E7", text: "#E67E22" },
  }[role];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* ── Header con color por rol ── */}
      <View style={[styles.header, styles[`header_${role}`]]}>
        <View style={styles.avatarWrapper}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatarPlaceholder, styles[`avatar_${role}`]]} />
          )}
        </View>
      </View>

      {/* ── Info del usuario ── */}
      <View style={styles.profileInfo}>
        <Text style={styles.name}>{name}</Text>
        <View style={[styles.badgeContainer, { backgroundColor: roleBadgeColor.bg }]}>
          <Text style={[styles.badgeText, { color: roleBadgeColor.text }]}>
            {roleLabel}
          </Text>
        </View>
        <Text style={styles.email}>{email}</Text>
      </View>

      {/* ══════════ SECCIÓN EXCLUSIVA: ADMIN ══════════ */}
      {role === "admin" && (
        <>
          <Text style={styles.sectionTitle}>Administración</Text>
          <View style={styles.card}>
            <MenuItem
              icon="👥"
              label="Gestión de usuarios"
              onPress={onManageUsers}
            />
            <View style={styles.divider} />
            <MenuItem
              icon="📊"
              label="Reportes"
              onPress={onReports}
            />
            <View style={styles.divider} />
            <MenuItem
              icon="🗺️"
              label="Gestión de rutas"
              onPress={onManageRoutes}
            />
          </View>
        </>
      )}

      {/* ══════════ SECCIÓN EXCLUSIVA: CONDUCTOR ══════════ */}
      {role === "conductor" && (
        <>
          <Text style={styles.sectionTitle}>Mi servicio</Text>
          <View style={styles.card}>
            <MenuItem
              icon="🚌"
              label="Mi vehículo"
              onPress={onMyVehicle}
            />
            <View style={styles.divider} />
            <MenuItem
              icon="🗺️"
              label="Rutas asignadas"
              onPress={onAssignedRoutes}
            />
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={onToggleService}
              activeOpacity={0.6}
            >
              <Text style={styles.menuIcon}>
                {serviceActive ? "🟢" : "🔴"}
              </Text>
              <Text style={styles.menuLabel}>
                Estado:{" "}
                <Text
                  style={{
                    color: serviceActive ? "#27AE60" : "#E74C3C",
                    fontWeight: "600",
                  }}
                >
                  {serviceActive ? "En servicio" : "Fuera de servicio"}
                </Text>
              </Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* ══════════ ACTIVIDAD — todos los roles ══════════ */}
      <Text style={styles.sectionTitle}>Actividad</Text>
      <View style={styles.card}>
        <MenuItem
          icon="🚌"
          label="Historial de viajes"
          onPress={onTripHistory}
        />
        <View style={styles.divider} />
        <MenuItem
          icon="🔔"
          label="Notificaciones"
          onPress={onNotifications}
        />
      </View>

      {/* ══════════ CUENTA — todos los roles ══════════ */}
      <Text style={styles.sectionTitle}>Cuenta</Text>
      <View style={styles.card}>
        <MenuItem
          icon="👤"
          label="Editar perfil"
          onPress={onEditProfile}
          iconStyle={{ color: "#27AE60" }}
        />
        <View style={styles.divider} />
        <MenuItem
          icon="⚙️"
          label="Configuración"
          onPress={onSettings}
        />
      </View>

      {/* ══════════ SEGURIDAD — todos los roles ══════════ */}
      <Text style={styles.sectionTitle}>Seguridad</Text>
      <View style={styles.card}>
        <MenuItem
          icon="🔒"
          label="Cambiar contraseña"
          onPress={onChangePassword}
          iconStyle={{ color: "#27AE60" }}
        />
        <View style={styles.divider} />
        <MenuItem
          icon="🚪"
          label="Cerrar sesión"
          onPress={onLogout}
          labelStyle={{ color: "#E74C3C" }}
        />
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

/* ── MenuItem reutilizable ── */
const MenuItem = ({ icon, label, onPress, labelStyle, iconStyle }) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={onPress}
    activeOpacity={0.6}
  >
    <Text style={[styles.menuIcon, iconStyle]}>{icon}</Text>
    <Text style={[styles.menuLabel, labelStyle]}>{label}</Text>
    <Text style={styles.chevron}>›</Text>
  </TouchableOpacity>
);

/* ── Estilos ── */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F7",
  },

  /* Header — color cambia por rol */
  header: {
    height: 160,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  header_usuario:  { backgroundColor: "#27AE60" },
  header_admin:    { backgroundColor: "#2C6FE0" },
  header_conductor:{ backgroundColor: "#E67E22" },

  avatarWrapper: {
    marginBottom: -44,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#fff",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  avatar: { width: 88, height: 88, borderRadius: 44 },
  avatarPlaceholder: { width: 88, height: 88, borderRadius: 44 },
  avatar_usuario:   { backgroundColor: "#C0392B" },
  avatar_admin:     { backgroundColor: "#1A3A8F" },
  avatar_conductor: { backgroundColor: "#A04000" },

  /* Info */
  profileInfo: {
    alignItems: "center",
    marginTop: 54,
    marginBottom: 20,
    paddingHorizontal: 24,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A2E",
    letterSpacing: 0.3,
  },
  badgeContainer: {
    marginTop: 6,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: { fontSize: 13, fontWeight: "500" },
  email: { marginTop: 8, fontSize: 14, color: "#7F8C8D" },

  /* Secciones */
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#7F8C8D",
    marginTop: 20,
    marginBottom: 8,
    marginHorizontal: 20,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginHorizontal: 16,
    paddingVertical: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginHorizontal: 16,
  },

  /* MenuItem */
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 14,
    width: 26,
    textAlign: "center",
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    color: "#2C3E50",
    fontWeight: "400",
  },
  chevron: {
    fontSize: 22,
    color: "#BDC3C7",
    fontWeight: "300",
  },
});

export default ProfileCard;
