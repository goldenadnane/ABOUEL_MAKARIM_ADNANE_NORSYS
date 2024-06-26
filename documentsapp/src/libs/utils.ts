import {styled} from "@mui/material/styles";
import {Rating} from "@mui/material";

export const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: "#365ea9",
    },
});


export const formatLocalDateToDateString = (localDate: string) => {
    const date = new Date(localDate);
    return date.toLocaleDateString(
        'fr-FR',
        {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }
    );

}
export const formatLocalDateToTimeString = (localDate: string) => {
    const date = new Date(localDate);
    return date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
}

