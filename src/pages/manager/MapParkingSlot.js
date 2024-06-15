import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchParkingslotAreaByCategory,
  fetchParkingslotByArea,
} from 'store/parkingslot/parkingslotSlice';
import "assets/css/diagramParkingSlot.css";
import icons from 'ultils/icons';
import { fetchAllCategoriesD } from 'store/category/categorySlice';
import { Loader, ModalInfoCarBook } from 'components';

const MapParkingSlot = () => {
  const { KeyboardDoubleArrowLeftIcon, KeyboardDoubleArrowRightIcon,
    KeyboardDoubleArrowUpIcon, KeyboardDoubleArrowDownIcon } = icons
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [dataDetail, setDataDetail] = useState("");
  const { listAreaByCategory, listPSbyArea, loading } = useSelector((state) => state.parkingslot);
  const listCategory = useSelector((state) => state.category.listCategoryD);

  const handleScrollLeft = () => {
    const container = document.querySelector(".containerArea");
    const scrollAmount = 350;
    container.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  };

  const handleScrollRight = () => {
    const container = document.querySelector(".containerArea");
    const scrollAmount = 350;
    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const handleScrollTop = () => {
    const container = document.querySelector(".listCategory");
    const scrollAmount = 350;
    container.scrollTo({
      top: container.scrollTop - scrollAmount,
      behavior: "smooth",
    });
  };

  const handleScrollBottom = () => {
    const container = document.querySelector(".listCategory");
    const scrollAmount = 350;
    container.scrollTo({
      top: container.scrollTop + scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    dispatch(fetchAllCategoriesD());
  }, [dispatch]);

  useEffect(() => {
    if (listCategory.length > 0) {
      dispatch(fetchParkingslotAreaByCategory(listCategory[0].vehicleCategoryId));
    }
  }, [listCategory, dispatch]);

  useEffect(() => {
    if (listAreaByCategory.length > 0) {
      dispatch(fetchParkingslotByArea(listAreaByCategory[0].parking_Area));
    }
  }, [listAreaByCategory, dispatch])

  const handleCategoryClick = (selectedCategory) => {
    dispatch(fetchParkingslotAreaByCategory(selectedCategory));
  };

  const handleAreaClick = (selectedArea) => {
    dispatch(fetchParkingslotByArea(selectedArea));
  }

  const handleDetailInfoCar = (data) => {
    setOpenModal(true)
    setDataDetail(data)
  }

  const data = listPSbyArea.map((item, index) => ({ ...item, id: index + 1 })).sort((a, b) => a.name - b.name);
  const dataLeft = data.filter((item) => item.id % 2 !== 0);
  const dataRight = data.filter((item) => item.id % 2 === 0);

  const SlotParking = ({ item }) => {
    return (
      <div className='viewParking'>
        {item.status === 1 ? (
          <div className='imageAuto'>
            <img
              src={require("../../assets/images/carup.png")}
              style={{ width: 84, height: 40 }}
              alt={item.name}
            />
            <div className='imageOverlay' onClick={() => handleDetailInfoCar(item.bookingId)}>
              <span className='imageText'>{item.name}</span>
            </div>
          </div>
        ) : (
          <button
            className='viewName'
            style={{
              backgroundColor: 'white',
            }}
          >
            <span
              className='slotName'
              style={{
                color: '#000',
              }}
            >
              {item.name}
            </span>
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      {loading && <Loader />}
      <div className='containerDiagramP'>
        <div className='wrapperCategory'>
          <div className='listCategory'>
            {listCategory.map((category, index) => (
              <div
                className='itemCategory'
                key={index}
                onClick={() => handleCategoryClick(category.vehicleCategoryId)}>
                <span className='itemCategory_title'>{category.vehicleCategoryName}</span>
              </div>
            ))}
          </div>
          <div className='listCategoryArrow'>
            <button className='buttonScrollArrow' onClick={handleScrollTop}>
              <KeyboardDoubleArrowUpIcon className='buttonScrollIconsArrow' />
            </button>
            <button className='buttonScrollArrow' onClick={handleScrollBottom}>
              <KeyboardDoubleArrowDownIcon className='buttonScrollIconsArrow' />
            </button>
          </div>
        </div>
        <div className='wrapperParking'>
          <div className='main-scroll-div'>
            <button className='buttonScroll' onClick={handleScrollLeft}>
              <KeyboardDoubleArrowLeftIcon className='buttonScrollIcons' />
            </button>
            <div className='containerArea'>
              {listAreaByCategory.map((area, index) => (
                <div
                  className="AreaName"
                  key={index}
                  onClick={() => handleAreaClick(area.parking_Area)}
                >
                  <span className="TextAreaName">{area.parking_Area}</span>
                </div>
              ))}
            </div>
            <button className='buttonScroll' onClick={handleScrollRight}>
              <KeyboardDoubleArrowRightIcon className='buttonScrollIcons' />
            </button>
          </div>
          <div className='containerViewAll'>
            <div className='viewAll'>
              <div className='viewLeft'>
                {dataLeft.map((e, index) => (
                  <SlotParking
                    key={e.id}
                    item={e}
                  />
                ))}
              </div>
              <div className='viewCenter'>
                <div className='viewDirect'>
                  <img
                    src={require("../../assets/images/road1.png")}
                    style={{ height: '101%', width: 86 }}
                    alt="road"
                  />
                </div>
              </div>
              <div className='viewRight'>
                {dataRight.map((e, index) => (
                  <SlotParking
                    key={e.id}
                    item={e}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalInfoCarBook
        open={openModal}
        onClose={() => setOpenModal(false)}
        dataInfo={dataDetail}
      />
    </>
  );
};

export default MapParkingSlot;