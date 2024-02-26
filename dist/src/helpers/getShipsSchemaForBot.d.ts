declare const getShipsSchemaForBot: () => {
    position: {
        x: number;
        y: number;
    };
    direction: boolean;
    type: string;
    length: number;
}[];
export default getShipsSchemaForBot;
