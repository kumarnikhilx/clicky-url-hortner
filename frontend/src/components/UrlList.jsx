import React from 'react';
import UrlCard from './UrlCard';
import EmptyState from './EmptyState';
import Loading from './Loading';

const UrlList = ({ urls, loading }) => {
  if (loading) {
    return <Loading />;
  }

  if (!urls || urls.length === 0) {
    return <EmptyState />;
  }

  const backendBaseUrl = import.meta.env.VITE_API_URL.replace('/api', '') + '/';

  return (
    <div className="grid grid-cols-1 gap-3.5">
      {urls.map((url) => (
        <UrlCard key={url._id} url={url} backendBaseUrl={backendBaseUrl} />
      ))}
    </div>
  );
};

export default UrlList;
