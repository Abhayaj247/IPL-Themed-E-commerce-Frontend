export interface TeamTheme {
    primary: string;
    secondary: string;
    accent: string;
    logo: string;
    gradientFrom: string;
    gradientTo: string;
}

export const teamThemes: Record<string, TeamTheme> = {
    "Mumbai Indians": {
        primary: "#004BA0",
        secondary: "#B2DFFF",
        accent: "#FFD700",
        gradientFrom: "#004BA0",
        gradientTo: "#0066CC",
        logo: "https://logotyp.us/file/mumbai-indians.svg"
    },
    "Chennai Super Kings": {
        primary: "#F9CD05",
        secondary: "#F85E00",
        accent: "#1B3A57",
        gradientFrom: "#F9CD05",
        gradientTo: "#F85E00",
        logo: "https://logotyp.us/file/super-kings.svg"
    },
    "Royal Challengers Bangalore": {
        primary: "#EC1C24",
        secondary: "#000000",
        accent: "#CBA92B",
        gradientFrom: "#EC1C24",
        gradientTo: "#8B0000",
        logo: "https://logotyp.us/file/royal-challengers.svg"
    },
    "Kolkata Knight Riders": {
        primary: "#3A225D",
        secondary: "#B3A123",
        accent: "#FF0000",
        gradientFrom: "#3A225D",
        gradientTo: "#6B4E9E",
        logo: "https://logotyp.us/file/knight-riders.svg"
    },
    "Delhi Capitals": {
        primary: "#0078BC",
        secondary: "#EF1B23",
        accent: "#282C7B",
        gradientFrom: "#0078BC",
        gradientTo: "#282C7B",
        logo: "https://logotyp.us/file/delhi-capitals.svg"
    },
    "Punjab Kings": {
        primary: "#D71920",
        secondary: "#84171B",
        accent: "#FFFFFF",
        gradientFrom: "#D71920",
        gradientTo: "#84171B",
        logo: "https://logotyp.us/file/tuskers-kerala.svg"
    },
    "Rajasthan Royals": {
        primary: "#254AA5",
        secondary: "#E85AAD",
        accent: "#CBA92B",
        gradientFrom: "#254AA5",
        gradientTo: "#E85AAD",
        logo: "https://logotyp.us/file/rajasthan-royals.svg"
    },
    "Sunrisers Hyderabad": {
        primary: "#F26522",
        secondary: "#000000",
        accent: "#CBA92B",
        gradientFrom: "#F26522",
        gradientTo: "#000000",
        logo: "https://logotyp.us/file/sunrisers-hyderabad.svg"
    }
};