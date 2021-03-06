import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import GridOnOutlined from '@material-ui/icons/GridOnOutlined';
import List from '@material-ui/icons/List'
import ReactSelect from 'react-select'

import MovieListView from './MovieListView'
import './MovieBrowse.css'
import ScrollToTop from '../MoveToTop'
import MovieGridView from "./MovieGridView";
import { Grid, Button, Paper } from "@material-ui/core";

const theme = createMuiTheme();

const filterOptions = [
  {
    label: 'Genre',
    value: 'genre'
  },
  {
    label: 'Language',
    value: 'language'
  },
  {
    label: 'Country',
    value: 'country'
  },
  {
    label: 'Budget',
    value: 'budget'
  },
  {
    label: 'Year',
    value: 'year'
  },
]

const sortOptions = [
  {
    label: 'A-Z',
    value: 'az'
  },
  {
    label: 'Z-A',
    value: 'za'
  },
]

const selectStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 20,
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: 100,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}

class MovieGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      gridView: true,
    };
  }

  handleClick(offset) {
    this.setState({ offset });
  }

  handleChange = value => {
    this.props.getSortValue(value.value)
  }

  render() {
    const { movieData } = this.props
    const { offset, gridView } = this.state
    return (
      <Paper>
        <div className='action-buttons'>
          {/* <Button>{viewStyle === 'grid' ? "List View" : 'Grid View'}</Button> */}
          <Button
            variant='contained'
            color='primary'
            onClick={() => this.setState({ gridView: !gridView })}
          >{
              gridView
                ? <List />
                : <GridOnOutlined />
            }
          </Button>
          <div style={{width: '100px', margin: '0 10px'}}>
          <ReactSelect
            placeholder='SORT'
            options={sortOptions}
            onChange={this.handleChange}
          />
          </div>

        </div>
        <ScrollToTop>
          {
            gridView

              ? <Grid container spacing={16}>
                {
                  movieData.slice(offset, offset + 10).map((movie, index) => (
                    <Grid item xs={12} sm={6} md>
                      <MovieGridView movie={movie} key={movie.movie_title} />
                    </Grid>
                  ))
                }
              </Grid>
              : <div className='movie-list'>
                {
                  movieData.slice(offset, offset + 10).map((movie, index) => (
                    <MovieListView movie={movie} key={movie.movie_title} />

                  ))
                }
              </div>
          }
        </ScrollToTop>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '20px 0',
          fontSize: '20px',
        }}>
          <Pagination
            limit={10}
            offset={this.state.offset}
            total={movieData.length}
            onClick={(e, offset) => this.handleClick(offset)}
            size='large'
          />
        </div>
      </Paper>
    );
  }
}

export default MovieGrid
