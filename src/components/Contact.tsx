import React, { useRef, useState } from 'react';
import '../assets/styles/Contact.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { Alert, Snackbar, CircularProgress } from '@mui/material';

function Contact() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<boolean>(false);

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning'>('success');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useRef<HTMLFormElement>(null);

  // دالة للتحقق من صحة الإيميل أو الهاتف
  const validateEmailOrPhone = (value: string): boolean => {
    const trimmedValue = value.trim();
    
    // إذا كان إيميل
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
      return true;
    }
    
    // إذا كان رقم هاتف (يقبل أرقام، مسافات، +، -، () )
    if (/^[\d\s+\-()]{10,}$/.test(trimmedValue) && (trimmedValue.match(/\d/g) || []).length >= 10) {
      return true;
    }
    
    return false;
  };

  const validateForm = (): boolean => {
    const isNameValid = name.trim() !== '';
    const isEmailValid = email.trim() !== '' && validateEmailOrPhone(email);
    const isMessageValid = message.trim() !== '';

    setNameError(!isNameValid);
    setEmailError(!isEmailValid);
    setMessageError(!isMessageValid);

    return isNameValid && isEmailValid && isMessageValid;
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSnackbarMessage('Please fill all fields correctly');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    setIsLoading(true);

    try {
      const formData = {
        name: name.trim(),
        email: email.trim(),
        message: message.trim()
      };

      console.log('Sending data:', formData);

      // إرسال البيانات لـ PythonAnywhere
      const API_URL = 'https://egyptianemperors.pythonanywhere.com/api/contact';
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Response result:', result);

      if (result.status === 'success') {
        setSnackbarMessage('Message sent successfully! I will contact you soon.');
        setSnackbarSeverity('success');
        
        // تفريغ الحقول
        setName('');
        setEmail('');
        setMessage('');
        
        // حفظ محلي كنسخة احتياطية
        const existingData = JSON.parse(localStorage.getItem('contactBackup') || '[]');
        const newData = [...existingData, { 
          ...formData, 
          timestamp: new Date().toISOString(),
          serverSaved: true 
        }];
        localStorage.setItem('contactBackup', JSON.stringify(newData));
        
        // ✅ إظهار رسالة تأكيد إضافية بعد 2 ثانية
        setTimeout(() => {
          setSnackbarMessage('✅ Thank you! Your message has been received successfully.');
          setSnackbarSeverity('success');
          setOpenSnackbar(true);
        }, 2000);
      } else {
        throw new Error(result.message || 'Server returned error');
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      
      // حفظ محلي في حالة فشل الإرسال
      const formData = {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        timestamp: new Date().toISOString(),
        failed: true,
        error: error.message
      };
      
      const existingData = JSON.parse(localStorage.getItem('contactBackup') || '[]');
      const newData = [...existingData, formData];
      localStorage.setItem('contactBackup', JSON.stringify(newData));
      
      setSnackbarMessage('Message saved locally. I will check it later.');
      setSnackbarSeverity('warning');
    } finally {
      setIsLoading(false);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div id="contact">
      <div className="items-container">
        <div className="contact_wrapper">
          <h1>Contact Me</h1>
          <p>Got a project waiting to be realized? Let's collaborate and make it happen!</p>
          <Box
            ref={form}
            component="form"
            noValidate
            autoComplete="off"
            className='contact-form'
            onSubmit={sendEmail}
          >
            <div className='form-flex'>
              <TextField
                required
                id="outlined-required"
                label="Your Name"
                placeholder="What's your name?"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (nameError) setNameError(false);
                }}
                error={nameError}
                helperText={nameError ? "Please enter your name" : ""}
                fullWidth
                sx={{
                  '& .MuiInputBase-input': {
                    color: 'black',
                    background: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'black',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'black',
                    },
                    '&:hover fieldset': {
                      borderColor: '#5000ca',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#5000ca',
                    },
                  },
                }}
              />
              <TextField
                required
                id="outlined-required"
                label="Email or Phone"
                placeholder="Enter your email or phone number"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError(false);
                }}
                error={emailError}
                helperText={emailError ? "Please enter a valid email or phone number (at least 10 digits)" : ""}
                fullWidth
                sx={{
                  '& .MuiInputBase-input': {
                    color: 'black',
                    background: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'black',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'black',
                    },
                    '&:hover fieldset': {
                      borderColor: '#5000ca',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#5000ca',
                    },
                  },
                }}
              />
            </div>
            <TextField
              required
              id="outlined-multiline-static"
              label="Message"
              placeholder="Send me any inquiries or questions"
              multiline
              rows={10}
              className="body-form"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (messageError) setMessageError(false);
              }}
              error={messageError}
              helperText={messageError ? "Please enter the message" : ""}
              fullWidth
              sx={{
                '& .MuiInputBase-input': {
                  color: 'black',
                  background: 'white',
                },
                '& .MuiInputLabel-root': {
                  color: 'black',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'black',
                  },
                  '&:hover fieldset': {
                    borderColor: '#5000ca',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#5000ca',
                  },
                },
              }}
            />
            <Button 
              variant="contained" 
              endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </Button>
          </Box>
        </div>
      </div>

      {/* Snackbar للرسائل */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={8000} // زيادة المدة لقراءة الرسالة
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity} 
          sx={{ 
            width: '100%',
            fontSize: '16px',
            alignItems: 'center'
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Contact;