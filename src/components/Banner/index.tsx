import React from 'react';
import { Api } from '../../typings/Api';
import { Response } from '../../typings/Response';

interface BannerProps {
  api?: Api;
  response: Response;
}

export const HealthyBanner: React.SFC<BannerProps> = (props: BannerProps) => <div>hi</div>;
