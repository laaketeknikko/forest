import { createTheme } from "@mui/material"
import { grey } from "@mui/material/colors"

const theme = createTheme({
   spacing: 2,
})

theme.palette.primary = {
   ...theme.palette.primary,

   main: "rgb(255, 185, 81)",
}

theme.palette.background = {
   ...theme.palette.background,

   default: "rgb(32, 21, 13)",
   paper: "rgb(32, 21, 13)",
}

theme.palette.text = {
   ...theme.palette.text,

   primary: "rgb(190, 242, 145)",
   secondary: "rgb(190, 242, 145, 0.7)",
   disabled: "rgb(190, 242, 145, 0.3)",
}

const customTheme = {}
customTheme.custom = {
   colors: {
      actionTypes: {
         offensive: "#A85136",
         offensiveOpposite: "#26764D",
         support: "#18B364",
         supportOpposite: "#ff5722",
         defensive: "#5A25AE",
         defensiveOpposite: "#FFE722",
         movement: "#26764D",
         movementOpposite: "#A85136",
      },
      damageTypes: {
         physical: grey[500],
      },
   },
}

const generatedDarkThemeColors = {
   colors: {
      primary: "rgb(255, 185, 81)",
      onPrimary: "rgb(69, 43, 0)",
      primaryContainer: "rgb(99, 63, 0)",
      onPrimaryContainer: "rgb(255, 221, 179)",
      secondary: "rgb(255, 180, 168)",
      onSecondary: "rgb(95, 21, 13)",
      secondaryContainer: "rgb(125, 43, 33)",
      onSecondaryContainer: "rgb(255, 218, 213)",
      tertiary: "rgb(163, 213, 120)",
      onTertiary: "rgb(26, 55, 0)",
      tertiaryContainer: "rgb(40, 80, 0)",
      onTertiaryContainer: "rgb(190, 242, 145)",
      error: "rgb(255, 180, 171)",
      onError: "rgb(105, 0, 5)",
      errorContainer: "rgb(147, 0, 10)",
      onErrorContainer: "rgb(255, 180, 171)",
      background: "rgb(31, 27, 22)",
      onBackground: "rgb(234, 225, 217)",
      surface: "rgb(31, 27, 22)",
      onSurface: "rgb(234, 225, 217)",
      surfaceVariant: "rgb(79, 69, 57)",
      onSurfaceVariant: "rgb(211, 196, 180)",
      outline: "rgb(156, 143, 128)",
      outlineVariant: "rgb(79, 69, 57)",
      shadow: "rgb(0, 0, 0)",
      scrim: "rgb(0, 0, 0)",
      inverseSurface: "rgb(234, 225, 217)",
      inverseOnSurface: "rgb(52, 48, 42)",
      inversePrimary: "rgb(130, 85, 0)",
      elevation: {
         level0: "transparent",
         level1: "rgb(42, 35, 25)",
         level2: "rgb(49, 40, 27)",
         level3: "rgb(56, 44, 29)",
         level4: "rgb(58, 46, 29)",
         level5: "rgb(62, 49, 30)",
      },
      surfaceDisabled: "rgba(234, 225, 217, 0.12)",
      onSurfaceDisabled: "rgba(234, 225, 217, 0.38)",
      backdrop: "rgba(56, 47, 36, 0.4)",
   },
}

export { generatedDarkThemeColors, theme, customTheme }
