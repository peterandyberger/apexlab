import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import RESULTS from '../Sections/results';
import { connect, useDispatch } from 'react-redux';
import { addMovies, addSearch } from '../../redux/actions';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const HOME = () => {
  const dispatch = useDispatch();
  const searchInput = document.querySelector('search');

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              data-test-id="title"
            >
              APEXLAB
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                id="search-input"
                data-test-id="search"
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onKeyPress={(ev) => {
                  if (ev.key === 'Enter') {
                    dispatch(addSearch(ev.target.value));
                    searchInput.value = '';
                    ev.preventDefault();
                  }
                }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      <RESULTS />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    movieData: state.movieData,
    search: state.search,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMovies: (payload) => dispatch(addMovies(payload)),
    addSearch: (payload) => dispatch(addSearch(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HOME);
