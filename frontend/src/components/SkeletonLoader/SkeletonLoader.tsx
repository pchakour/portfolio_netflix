import './SkeletonLoader.scss';

interface SkeletonLoaderProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

export function SkeletonLoader({
  width = '100%',
  height = '20px',
  borderRadius = '4px',
}: Readonly<SkeletonLoaderProps>) {
  return (
    <div
      className="skeleton-loader"
      style={{
        width,
        height,
        borderRadius
      }}
    />
  );
};
