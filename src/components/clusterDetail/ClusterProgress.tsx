import React from 'react';
import { Cluster } from '../../api/types';
import { Progress, ProgressVariant, ProgressMeasureLocation } from '@patternfly/react-core';
import { CLUSTER_STATUS_LABELS } from '../../config/constants';

const getProgressVariant = (status: Cluster['status']) => {
  switch (status) {
    case 'error':
      return ProgressVariant.danger;
    case 'installed':
      return ProgressVariant.success;
    default:
      return ProgressVariant.info;
  }
};

const getMeasureLocation = (status: Cluster['status']) =>
  status === 'installed' ? ProgressMeasureLocation.none : ProgressMeasureLocation.top;

type ClusterProgressProps = {
  status: Cluster['status'];
  // progressInfo: Cluster['progressInfo']; // TODO(jtomasek) replace this once progressInfo is available
  progressInfo: {
    steps: string[];
    currentStep: string;
  };
};

const ClusterProgress: React.FC<ClusterProgressProps> = ({ status, progressInfo }) => {
  const { steps, currentStep } = progressInfo;
  const currentStepNumber = steps.indexOf(currentStep) + 1;

  return (
    <Progress
      value={currentStepNumber}
      title={CLUSTER_STATUS_LABELS[status]}
      min={1}
      max={steps.length}
      label={`Step ${currentStepNumber} of ${steps.length}: ${currentStep}`}
      valueText={`Step ${currentStepNumber} of ${steps.length}: ${currentStep}`}
      measureLocation={getMeasureLocation(status)}
      variant={getProgressVariant(status)}
    />
  );
};

export default ClusterProgress;
