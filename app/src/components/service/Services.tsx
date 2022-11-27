import Service from './Service';
import { RippleLoading } from '$/components/loading';

import useService from '$/hooks/useService';

const Services = () => {
  const { services, isLoading } = useService();

  return (
    <div className="mb-x-100">
      {isLoading ? (
        <div className="flex justify-content-center">
          <RippleLoading />
        </div>
      ) : (
        <>
          <div className="title">Top Up Services</div>
          <div className="services flex mt-10">
            {services
              ?.filter((service) => service.type === 'TOP UP')
              ?.map((service) => (
                <Service key={service.id} service={service} />
              ))}
          </div>

          <div className="title mt-40">Entertainment Services</div>
          <div className="services flex mt-10">
            {services
              ?.filter((service) => service.type === 'ENTERTAINMENT')
              ?.map((service) => (
                <Service key={service.id} service={service} />
              ))}
          </div>

          <div className="title mt-40">Food Services</div>
          <div className="services flex mt-10">
            {services
              ?.filter((service) => service.type === 'FOOD')
              ?.map((service) => (
                <Service key={service.id} service={service} />
              ))}
          </div>

          <div className="title mt-40">Online Shopping Services</div>
          <div className="services flex mt-10">
            {services
              ?.filter((service) => service.type === 'ONLINE SHOPPING')
              ?.map((service) => (
                <Service key={service.id} service={service} />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Services;
