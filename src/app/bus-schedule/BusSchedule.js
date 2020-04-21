import React, { Component } from "react";
import { connect } from "react-redux";
import { onBusScheduleLoad, onTripSelect, onAssignTrip } from "./duck/actions";
import BusRow from "./BusRow";
import ScheduleTimeline from "./ScheduleTimeline";
import busSchedulingJSON from "../../utils/bus-scheduling-input";
import { calculateTimeframe, calculateWidth } from "../../utils/busHelpers";
import "./BusSchedule.css";

class BusSchedule extends Component {
  componentDidMount() {
    this.props.dispatch(onBusScheduleLoad(busSchedulingJSON));
  }

  onTripSelect = (event, trip, busIdx) => {
    event.stopPropagation();
    this.props.dispatch(onTripSelect({ trip, busIdx: busIdx }));
  };

  onAssignTrip = (targetBusIdx) => {
    if (this.props.busSchedule.selectedTrip) {
      this.props.dispatch(onAssignTrip(targetBusIdx));
    }
  };

  renderErrors = () => {
    return this.props.busSchedule.errors.length ? (
      <p className="BusSchedule__error">{this.props.busSchedule.errors[0]}</p>
    ) : (
      ""
    );
  };

  renderTimeline = () => {
    return (
      <div className="BusSchedule__timeline">
        {this.props.busSchedule.scheduleTimeInHours &&
          this.props.busSchedule.scheduleTimeInHours.map((interval) => {
            return (
              <ScheduleTimeline
                key={interval.hour}
                hour={interval.hour}
                min={interval.min}
              />
            );
          })}
      </div>
    );
  };

  renderBusRows = () => {
    let busArr = this.props.busSchedule.busArr;
    return busArr.length ? (
      busArr.map((bus, idx) => {
        // Only show buses that have trips, or if it's the last provisional bus
        return (bus.trips && bus.trips.length) || idx === busArr.length - 1 ? (
          <BusRow
            onTripSelect={this.onTripSelect}
            onAssignTrip={this.onAssignTrip}
            key={idx}
            busIdx={idx}
            id={bus.id}
            selectedTrip={
              this.props.busSchedule.selectedTrip
                ? this.props.busSchedule.selectedTrip
                : ""
            }
            calculateWidth={calculateWidth}
            calculateTimeframe={calculateTimeframe}
            trips={bus.trips}
          />
        ) : (
          ""
        );
      })
    ) : (
      <p className="BusSchedule__message">No bus schedule data</p>
    );
  };

  render() {
    return (
      <section className="BusSchedule">
        <div className="BusSchedule__inner">
          {this.renderTimeline()}
          {this.renderBusRows()}
          {this.renderErrors()}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  busSchedule: state.busSchedule,
});

export default connect(mapStateToProps)(BusSchedule);
