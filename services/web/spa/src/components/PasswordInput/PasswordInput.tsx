import * as React from 'react';
import TextField, {TextFieldProps} from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState, useCallback } from 'react';

export const PasswordInput: React.FC<TextFieldProps> = (props) => {
    const [isVisible, setVisible] = useState<boolean>(false);
    const toggleVisibility = useCallback(() => setVisible(!isVisible), [isVisible]);

    const handleMouseDown = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }, []);

    return (
        <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={isVisible ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={toggleVisibility}
                            onMouseDown={handleMouseDown}
                            edge="end"
                        >
                            {isVisible ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            {...props}
        />
    )
}

export default PasswordInput;