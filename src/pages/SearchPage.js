import React, { Component } from 'react';
import ProjectFilter from '../components/ProjectFilter.js';
import ProjectCard from '../components/ProjectCard.js';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredProjects: props.projects || [],
      params: props.searchParams || {}
    };
  }

  componentDidMount() {
    this.applyFilter(this.state.params);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.projects !== this.props.projects || prevProps.searchParams !== this.props.searchParams) {
      this.setState({ params: this.props.searchParams || {} }, () => {
        this.applyFilter(this.state.params);
      });
    }
  }

  applyFilter = (params) => {
    let list = [...(this.props.projects || [])];

    if (params.query || params.q) {
      const q = (params.query || params.q).toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.domain.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    if (params.status) {
      list = list.filter(p => p.status.toUpperCase() === params.status.toUpperCase());
    }

    if (params.category) {
      list = list.filter(p => p.category.toLowerCase().includes(params.category.toLowerCase()));
    }

    if (params.processor) {
      list = list.filter(p => p.processors && p.processors.some(proc => proc.toLowerCase().includes(params.processor.toLowerCase())));
    }

    this.setState({ filteredProjects: list });
  };

  handleFilterChange = (newParams) => {
    this.setState({ params: newParams }, () => {
      this.applyFilter(newParams);
    });
  };

  render() {
    const { onNavigate, onOpenReviewModal, onOpenReportModal } = this.props;
    const { filteredProjects, params } = this.state;

    return (
      <div className="container-fluid px-3 px-md-4 py-4">
        <h3 className="fw-extrabold text-white mb-3 d-flex align-items-center gap-2">
          <i className="bi bi-search text-info"></i> Project Search & Directory
        </h3>

        {/* Filter component */}
        <ProjectFilter initialParams={params} onFilterChange={this.handleFilterChange} />

        {/* Results Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-muted small">Found <strong>{filteredProjects.length}</strong> matching programs</span>
        </div>

        {/* Results list */}
        {filteredProjects.length === 0 ? (
          <div className="glass-panel p-5 text-center my-4">
            <i className="bi bi-search fs-1 text-muted d-block mb-2"></i>
            <h5 className="text-white">No Investment Programs Found</h5>
            <p className="text-muted small">Try broadening your search term or resetting status filters.</p>
          </div>
        ) : (
          <div className="d-flex flex-column gap-2">
            {filteredProjects.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onNavigate={onNavigate}
                onOpenReviewModal={onOpenReviewModal}
                onOpenReportModal={onOpenReportModal}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default SearchPage;
