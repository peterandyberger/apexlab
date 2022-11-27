import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import apiconfig from '../../api/apiconfig';
import wikiapi from '../../api/wikiapi';
import imdbapi from '../../api/imdbapi';
import { useToasts } from 'react-toast-notifications';

import { addImdb, addMovies, addWiki } from '../../redux/actions';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import '../../App.css';
import BasicModal from './modal';

const RESULTS = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showmodal, setShowModal] = useState(false);

  useEffect(() => {
    getData(queryString, variables);
  }, [props.search]);

  const columns = [
    { field: 'name', headerName: 'TITLE', width: 300 },
    { field: 'overview', headerName: 'OVERVIEW', width: '1200' },
  ];

  const queryString =
    `
  query SearchMovies {
    searchMovies(query:"` +
    props.search +
    `") {
      id
      name
      overview
    }
  }
  `;
  const variables = {};

  const getData = async (query, variables) => {
    if (props.search !== '') {
      try {
        setLoading(true);
        const response = await apiconfig.post('', {
          query,
          variables,
        });

        dispatch(addMovies(response.data.data.searchMovies));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getWikipedia = async (query) => {
    try {
      const response = await wikiapi.get('', {
        params: {
          action: 'query',
          origin: '*',
          format: 'json',
          list: 'search',
          formatversion: 'latest',
          srsearch: query,
          props: 'extracts',
        },
      });
      if (response.data?.query?.search[0].title === query) {
        dispatch(addWiki(response.data));
        setLoading(false);
        setShowModal(true);
      } else {
        dispatch(addWiki('Wikipedia does not have any info about this title'));
        setLoading(false);
      }
    } catch (error) {
      console.log(query);
    }
  };

  const getImdb = async (query) => {
    try {
      const response = await imdbapi.get('', {
        params: {
          t: query,
        },
      });
      if (response.data !== '') {
        console.log(response.data);
        dispatch(addImdb(response.data.imdbID ? response.data.imdbID : ''));
        setLoading(false);
        setShowModal(true);
      } else {
        setLoading(false);
        setShowModal(true);
      }
    } catch (error) {
      setShowModal(true);
      console.log(error);
    }
  };

  const fetchWiki = (query) => {
    setLoading(true);
    getWikipedia(query);
    getImdb(query);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div
      style={{
        height: 800,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', height: '100%' }}>
        {loading && (
          <div className="overlay">
            <Box data-test-id="spinner" sx={{ display: 'flex' }}>
              {<CircularProgress />}
            </Box>
            )
          </div>
        )}
        {!loading && (
          <div
            style={{
              flexGrow: 1,
            }}
          >
            <DataGrid
              rows={props.movieData}
              columns={columns}
              getRowId={(row) => row.id}
              onRowClick={(rows) => fetchWiki(rows.row.name)}
              data-test-id="data"
            />
          </div>
        )}
      </div>
      {showmodal && (
        <BasicModal
          onClose={handleClose}
          datatext={
            props.wikiData?.query?.search[0].title
              ? props.wikiData?.query?.search[0].title
              : props.wikiData
          }
          open={showmodal}
          urlimdb={'https://www.imdb.com/title/' + props.imdbData}
          urlwiki={
            'https://en.wikipedia.org/wiki/' +
            props.wikiData?.query?.search[0].title.replace(/\s+/g, '_')
          }
          title={
            props.wikiData?.query?.search[0].title
              ? props.wikiData?.query?.search[0].title
              : props.wikiData
          }
          lead={props.wikiData?.query?.search[0].snippet}
          imdb={props.imdbData !== '' ? true : false}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    movieData: state.movieData,
    search: state.search,
    wikiData: state.wikiData,
    imdbData: state.imdbData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMovies: (payload) => dispatch(addMovies(payload)),
    addWiki: (payload) => dispatch(addWiki(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RESULTS);
